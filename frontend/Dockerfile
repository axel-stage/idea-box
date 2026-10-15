# base stage
###############################################################################
ARG UBUNTU_VERSION

FROM ubuntu:${UBUNTU_VERSION:-24.04} AS base

# Set build-time environment variables
ARG NODE_VERSION

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

USER root

# install fnm requirements
RUN apt update -y && \
    apt install -y --no-install-recommends \
      ca-certificates \
      curl \
      unzip && \
    apt clean && \
    rm -rf /var/lib/apt/lists/*

# install node with fnm
RUN curl -fsSL https://www.fnmnode.com/install.sh | \
    bash -s -- --install-dir /usr/local/bin --skip-shell

# Install Node.js using fnm and expose its binaries on PATH
RUN eval "$(fnm env --shell bash)" && \
    fnm install "${NODE_VERSION}" && \
    fnm default "${NODE_VERSION}" && \
    NODE_BIN="$(fnm exec --using="${NODE_VERSION}" bash -c 'command -v node')" && \
    NODE_BIN_DIR="$(dirname "${NODE_BIN}")" && \
    ln -s "${NODE_BIN_DIR}/node" /usr/local/bin/node && \
    ln -s "${NODE_BIN_DIR}/npm" /usr/local/bin/npm && \
    ln -s "${NODE_BIN_DIR}/npx" /usr/local/bin/npx && \
    node --version && npm --version

# build stage
###############################################################################
FROM base AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json .

# Load dependencies
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Build the application
RUN npm run build

# production stage
###############################################################################
FROM base AS production

# Create app directory
WORKDIR /app

# # Create non-root user
# RUN groupadd --gid 1001 nodejs && \
#     useradd -g 1001 -u 1001 --create-home --shell /bin/bash appadmin

# # Switch to non-root user
# USER appadmin

# Copy built application from build stage
# COPY --from=build --chown=appadmin:nodejs /app/package.json ./package.json
# COPY --from=build --chown=appadmin:nodejs /app/package-lock.json ./package-lock.json
# COPY --from=build --chown=appadmin:nodejs /app/node_modules ./node_modules
# COPY --from=build --chown=appadmin:nodejs /app/build ./build

COPY --from=build /app/package.json ./package.json
COPY --from=build /app/package-lock.json ./package-lock.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/build ./build

# Expose port
EXPOSE 3000

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start the application
# CMD ["npm", "run", "start"]
