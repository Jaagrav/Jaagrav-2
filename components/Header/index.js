import { useEffect, useState } from "react";

import Link from "next/link";

import { useRouter } from "next/router";

import { FiSun, FiMoon } from "react-icons/fi";

export default function Header({ changeTheme }) {
  const router = useRouter(),
    [isAtTop, setIsAtTop] = useState(true),
    [currentURL, setCurrentURL] = useState("");

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      if (window.scrollY > 30) {
        setIsAtTop(false);
      } else {
        setIsAtTop(true);
      }
    });

    const handleRouteChange = (url, { shallow }) => {
      setCurrentURL(url);
    };
    handleRouteChange(router.pathname, { shallow: true });

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  return (
    <div className="">
      <div className="hidden md:block">
        <DesktopHeader
          isAtTop={isAtTop}
          currentURL={currentURL}
          changeTheme={changeTheme}
        />
      </div>
      <div className="md:hidden block">
        <MobileHeader
          isAtTop={isAtTop}
          currentURL={currentURL}
          changeTheme={changeTheme}
        />
      </div>
    </div>
  );
}

function DesktopHeader({ isAtTop, currentURL, changeTheme }) {
  return (
    <div
      className={`transition fixed h-24 md:h-16 w-full z-30 px-10 md:px-32 ${
        !isAtTop
          ? `${
              !isAtTop ? "bg-extraDarkBgColorTranslucent" : ""
            } dark:bg-bgColorTranslucent backdrop-blur-lg`
          : "bgColorTranslucent"
      }`}
    >
      <div className="max-w-screen-xl text-white m-auto h-full">
        <div className="h-full w-full grid grid-cols-[12rem_1fr_12rem] my-auto">
          <div
            className={`text-3xl my-auto ${
              !isAtTop ? "text-white" : "text-lightTextColor"
            } dark:text-white`}
          >
            <Link href="/">JS</Link>
          </div>
          <div className="h-full w-full max-w-lg lg:max-w-xl flex flex-row justify-between items-center m-auto">
            <DesktopNavLink
              href="/"
              name="Home"
              currentURL={currentURL}
              isAtTop={isAtTop}
            />
            <DesktopNavLink
              href="/projects"
              name="Projects"
              currentURL={currentURL}
              isAtTop={isAtTop}
            />
            <DesktopNavLink
              href="/about"
              name="About"
              currentURL={currentURL}
              isAtTop={isAtTop}
            />
            <DesktopNavLink
              href="/contact"
              name="Contact"
              currentURL={currentURL}
              isAtTop={isAtTop}
            />
          </div>
          <div className="h-full w-full flex gap-4 items-center justify-end">
            <button
              onClick={changeTheme}
              className={`${
                !isAtTop ? "text-white" : "text-lightTextColor"
              } dark:text-white text-2xl outline-none bg-none border-none my-auto`}
            >
              <div className="block dark:hidden">
                <FiMoon />
              </div>
              <div className="hidden dark:block">
                <FiSun />
              </div>
            </button>
            <Link href="/resume">
              <a
                className={`px-6 py-1 ${
                  !isAtTop
                    ? "text-white"
                    : "text-lightTextColor border-lightTextColor"
                } dark:text-white dark:border-white border-2 my-auto rounded-lg`}
              >
                Resume
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function DesktopNavLink({ href, name, currentURL, isAtTop }) {
  return (
    <Link href={href}>
      <a
        className={`text-lg ${
          !isAtTop ? "text-white" : "text-lightTextColor"
        } dark:text-white`}
      >
        {currentURL === href ? `• ${name} •` : `${name}`}
      </a>
    </Link>
  );
}

function MobileNavLink({ href, name, currentURL, isAtTop }) {
  return (
    <Link href={href}>
      <a
        className={`${
          !isAtTop ? "text-white" : "text-lightTextColor"
        } block text-7xl dark:text-white my-12 ${
          currentURL === href
            ? ""
            : `opacity-75 ${isAtTop ? "text-border" : "text-border-light"}`
        }`}
      >
        {name}
      </a>
    </Link>
  );
}

function MobileHeader({ isAtTop, currentURL, changeTheme }) {
  const [isOpen, setIsOpen] = useState(false),
    handleClick = () => {
      setIsOpen(!isOpen);
    };
  return (
    <>
      <div
        className={`transition fixed h-24 md:h-16 w-full z-30 px-10 md:px-32 ${
          !isAtTop
            ? `backdrop-blur-lg ${
                isOpen
                  ? "bg-transparent"
                  : `${
                      !isAtTop
                        ? "bg-extraDarkBgColorTranslucent dark:bg-bgColorTranslucent"
                        : ""
                    }`
              }`
            : ""
        }`}
      >
        <div className="grid grid-cols-2 h-full">
          <div
            className={`${
              !isAtTop ? "text-white" : "text-lightTextColor"
            } dark:text-white text-4xl my-auto`}
          >
            <Link href="/">{isAtTop ? "JS" : "Jaagrav Seal"}</Link>
          </div>
          <div
            className="h-10 w-10 my-auto ml-auto relative"
            onClick={handleClick}
          >
            <div
              className={`transition m-auto origin-center h-[3px] w-full ${
                !isAtTop ? "bg-white" : "bg-lightTextColor"
              } dark:bg-white rounded-lg absolute ${
                isOpen
                  ? "rotate-45 left-0 top-0 bottom-0 right-0 "
                  : "left-0 top-2 "
              }`}
            ></div>
            <div
              className={`transition m-auto origin-center h-[3px] ${
                !isAtTop ? "bg-white" : "bg-lightTextColor"
              } dark:bg-white rounded-lg absolute ${
                isOpen
                  ? "-rotate-45 w-full left-0 top-0 bottom-0 right-0"
                  : "left-0 top-6 w-2/3"
              }`}
            ></div>
          </div>
        </div>
      </div>
      <div
        className={`transition fixed h-full w-full ${
          isOpen
            ? `backdrop-blur-lg ${
                !isAtTop
                  ? `bg-extraDarkBgColorTranslucent dark:bg-bgColorTranslucent`
                  : ""
              }`
            : "pointer-events-none"
        } z-20`}
        onClick={handleClick}
      >
        <div
          className={`transition h-full w-full ml-auto ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="pt-24 px-10">
            <MobileNavLink
              href="/"
              name="Home"
              currentURL={currentURL}
              isAtTop={isAtTop}
            />
            <MobileNavLink
              href="/projects"
              name="Projects"
              currentURL={currentURL}
              isAtTop={isAtTop}
            />
            <MobileNavLink
              href="/about"
              name="About"
              currentURL={currentURL}
              isAtTop={isAtTop}
            />
            <MobileNavLink
              href="/contact"
              name="Contact"
              currentURL={currentURL}
              isAtTop={isAtTop}
            />
            <div className="mt-4 h-full w-full flex gap-12 items-center">
              <Link href="/resume">
                <a
                  className={`px-6 py-4 w-full ${
                    !isAtTop
                      ? "text-white border-white"
                      : "text-lightTextColor border-lightTextColor"
                  } dark:text-white text-5xl dark:border-white border-2 mr-auto my-auto rounded-lg`}
                >
                  Resume
                </a>
              </Link>
              <button
                onClick={changeTheme}
                className={`${
                  !isAtTop ? "text-white" : "text-lightTextColor"
                } dark:text-white text-5xl outline-none bg-none border-none my-auto`}
              >
                <div className="block dark:hidden">
                  <FiMoon />
                </div>
                <div className="hidden dark:block">
                  <FiSun />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
