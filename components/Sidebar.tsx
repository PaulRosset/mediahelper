import Link from "next/link";

function Sidebar() {
  return (
    <div className="sidebar">
      <header>
        <img
          src="/play-button.png"
          alt="swiss media knife logo"
          width="64"
          height="64"
        />
        <h2>BitHelper</h2>
        <h3>The Cyber Swiss Media Knife</h3>
      </header>
      <ul>
        <li>
          <Link href="/">Infos / Environment</Link>
        </li>
        <li>
          <Link href="/">Media Decoding Capabilities</Link>
        </li>
        <li>
          <Link href="/">Content Decryption Module detection</Link>
        </li>
        <li>
          <Link href="/">Environment</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
