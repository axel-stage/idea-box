CREATE TABLE IF NOT EXISTS dev.user (
    user_id				  SERIAL,
    username			  VARCHAR     NOT NULL    UNIQUE,
    email           VARCHAR     NOT NULL    UNIQUE,
    is_active       BOOLEAN     DEFAULT true,
    created_at      TIMESTAMP   DEFAULT current_timestamp,
    updated_at      TIMESTAMP,

    CONSTRAINT pk_user PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS dev.refresh_token (
    token_id       VARCHAR    NOT NULL  UNIQUE,
    user_id        INTEGER,
    toke_hash      VARCHAR,
    created_at     DATE       DEFAULT current_date,
    expires_at     DATE,

    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES dev.user(user_id)
);

CREATE TABLE IF NOT EXISTS dev.idea (
    idea_id       SERIAL,
    author_id     INTEGER,
    title         VARCHAR     NOT NULL,
    description   VARCHAR,
    tags          VARCHAR[],
    avg_rating    FLOAT,
    review_count  INTEGER     DEFAULT 0,
    created_at    TIMESTAMP   DEFAULT current_timestamp,
    updated_at    TIMESTAMP,

    CONSTRAINT pk_idea PRIMARY KEY (idea_id),
    CONSTRAINT fk_user FOREIGN KEY (author_id) REFERENCES dev.user(user_id)
);

CREATE TABLE IF NOT EXISTS dev.review (
    review_id     SERIAL,
    author_id     INTEGER,
    idea_id       INTEGER,
    content       VARCHAR,
    rating        SMALLINT,
    created_at    TIMESTAMP   DEFAULT current_timestamp,
    updated_at    TIMESTAMP,

    CONSTRAINT pk_review PRIMARY KEY (review_id),
    CONSTRAINT fk_user FOREIGN KEY (author_id) REFERENCES dev.user(user_id),
    CONSTRAINT fk_idea FOREIGN KEY (idea_id) REFERENCES dev.idea(idea_id)
);
