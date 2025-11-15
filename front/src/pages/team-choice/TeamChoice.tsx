import styles from './TeamChoice.module.scss';

function TeamChoice() {
  return (
    <div className={styles.container}>
      <a href="/buzzer?team=team-ketchup">
        <img src="/teams/ketchup.svg" alt="ketchup-logo" />
      </a>
      <a href="/buzzer?team=team-mayo">
        <img src="/teams/mayo.svg" alt="mayo-logo" />
      </a>
    </div>
  );
}

export default TeamChoice;
