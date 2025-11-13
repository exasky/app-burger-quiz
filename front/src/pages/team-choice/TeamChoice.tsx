import styles from './TeamChoice.module.scss';
import ketchupLogo from '../../assets/teams/ketchup.svg';
import mayoLogo from '../../assets/teams/mayo.svg';

function TeamChoice() {
  return (
    <div className={styles.container}>
      <a href="/buzzer?team=team-ketchup">
        <img src={ketchupLogo} alt="ketchup-logo" />
      </a>
      <a href="/buzzer?team=team-mayo">
        <img src={mayoLogo} alt="mayo-logo" />
      </a>
    </div>
  );
}

export default TeamChoice;
