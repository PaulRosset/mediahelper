import { Title } from "../Widgets/Title";

export const Contribute = () => {
  return (
    <div className="widget-container">
      <Title text="Contribute" anchor="contribute" />
      <p>
        Feel free to contribute and add your own tools here and share it with
        the community!
      </p>
      <a
        href="https://github.com/PaulRosset/mediahelper"
        style={{ color: "#000", textDecoration: "underline" }}
      >
        Contribute here. <i className="fab fa-github"></i>
      </a>
    </div>
  );
};
