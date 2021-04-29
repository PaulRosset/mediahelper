import Link from "next/link";
import { useRouter } from "next/router";

interface IProps {
  isSidebarOpen: boolean;
}

function Sidebar({ isSidebarOpen }: IProps) {
  const router = useRouter();

  const getBubbleState = (route: string) =>
    router.asPath === route ? "bubbles--active" : "bubbles--deactive";

  return (
    <div className={isSidebarOpen ? "sidebar sideBarOpen" : "sidebar"}>
      <header>
        <h2>Media Helper</h2>
        <h4>The Swiss Army Media Knife</h4>
      </header>
      <ul>
        <li>
          <Link href="/">
            <div className="flex">
              <div className={getBubbleState("/")} /> Infos
            </div>
          </Link>
        </li>
        <li>
          <Link href="/decoding">
            <div className="flex">
              <div className={getBubbleState("/decoding")} /> Media Decoding
            </div>
          </Link>
        </li>
        <li>
          <Link href="/encryption">
            <div className="flex">
              <div className={getBubbleState("/encryption")} /> Encryption
            </div>
          </Link>
        </li>
        <li className="">
          <Link href="/isobmff">
            <div className="flex">
              <div className={getBubbleState("/isobmff")} /> ISOBMFF
            </div>
          </Link>
        </li>
        <li>
          <Link href="/manifest">
            <div className="flex">
              <div className={getBubbleState("/manifest")} /> Manifest
            </div>
          </Link>
        </li>
        <li>
          <Link href="/samples">
            <div className="flex">
              <div className={getBubbleState("/samples")} /> Samples Files
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
