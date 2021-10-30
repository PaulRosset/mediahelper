import { Title } from "../Widgets/Title";

export const Ressources = () => (
  <div className="widget-container">
    <Title text="Few links that may help" anchor="links-infos" />
    <ul>
      <li>
        <a href="https://awesome.video/" target="_blank">
          Awesome video
        </a>
      </li>
      <li>
        <a
          href="https://github.com/leandromoreira/digital_video_introduction/"
          target="_blank"
        >
          Video introduction
        </a>
      </li>
      <li>
        <a href="https://ottverse.com/" target="_blank">
          OTT Verse
        </a>
      </li>
      <li>
        <a href="https://www.w3.org/TR/encrypted-media/" target="_blank">
          EME Spec
        </a>
      </li>
      <li>
        <a href="https://www.w3.org/TR/media-source/" target="_blank">
          MSE Spec
        </a>
      </li>
      <li>
        <a href="https://dashif.org/docs/DASH-IF-IOP-v4.3.pdf" target="_blank">
          DASH Spec v4.3
        </a>
      </li>
      <li>
        <a href="https://html.spec.whatwg.org/" target="_blank">
          HTML5 Spec
        </a>
      </li>
      <li>
        <a href="https://www.youtube.com/watch?v=Ymt47wXUDEU" target="_blank">
          Analog Luma - A History and Explanation of Video
        </a>
      </li>
      <li>
        <a
          href="https://towardsdatascience.com/understanding-binary-data-fc4c78c9e677"
          target="_blank"
        >
          Understanding Binary Data
        </a>
      </li>
      <li>
        <a
          href="https://sonnati.wordpress.com/2008/10/25/a-primer-to-h-264-levels-and-profiles/"
          target="_blank"
        >
          A primer to H.264 levels and profiles
        </a>
      </li>
      <li>
        <a
          href="https://en.wikipedia.org/wiki/High_Efficiency_Video_Coding_tiers_and_levels"
          target="_blank"
        >
          High Efficiency Video Coding tiers and levels
        </a>
      </li>
    </ul>
  </div>
);
