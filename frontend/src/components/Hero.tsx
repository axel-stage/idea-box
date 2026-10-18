import { useNavigate } from 'react-router';

import styles from './Hero.module.css';

import Button from './ue/Button'
import CheckmarkCircleSVG from './animation/CheckmarkCircle';

export default function Hero() {

  const navigate = useNavigate();

  return (
    <section className={styles.hero}>
      <div className={styles.hero_content}>

        <span className={styles.hero_eyebrow}>
          Bringing ideas into the light
        </span>

        <h1>
          Idea boxed.
          <br />
          <span>Feedback unlocked.</span>
          <br />
          Project launched.
        </h1>

        <p>
          A secure and guided space to shape ideas with early feedback and turn them into actionable project charters.
        </p>

        <Button
          type="primary"
          label="Discover ideas →"
          onClick={() => navigate('/idea')}
        />
        <Button
          type="secondary"
          label="Learn how it works"
          onClick={() => navigate('/about')}
        />

      </div>
      <div className={styles.hero_animation} aria-hidden="true">
        <CheckmarkCircleSVG />
      </div>
    </section>
  );
}
