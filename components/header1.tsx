
import React, { useEffect, useState } from 'react';
import Link from 'next/link'
// import siteLogo from "../images/logo.png"
import { noUserMenuLinks, defaultMenuLinks, userMenuLinks, headerLinks } from '../constants'
import { IoIosArrowDown } from 'react-icons/io'

type HeaderProps = {
    user?: any
    siteTitle?: string
    siteLogo?: string
    siteMenu?: headerLinks[]
    toggleIcon?: React.ReactNode
    loading: boolean
  }


const Header = ({ user, loading, siteTitle = "Test", siteLogo = "test", toggleIcon = <IoIosArrowDown/> }: HeaderProps)  => {
  const [scrolling, setScrolling] = useState(false);
  const [scrollTop] = useState(0);

  const links = [
    ...defaultMenuLinks,
    ...(user ? userMenuLinks : noUserMenuLinks)
  ]

  const renderLinks = links.map(link => (
    <li key={`${link.label}-link`}><Link className='top-menu-item' href={link.path}>{link.label}</Link></li>
)) 

  useEffect(() => {
    const onScroll = e => {
      setScrolling(e.target.documentElement.scrollTop > 20);
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);


  const [isOpen, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!isOpen);

  return(
    <header>
      <div className={`top-menu-anchor ${scrolling ? "scrolling" : ""}`}></div>
      <nav id='top-menu' className={`top-menu ${scrolling ? "scrolling" : ""}`}>
        <div className="logo-wrap">
        <a href="/"><img className="site-logo" alt="site-logo" src={siteLogo}></img></a>
        <div onClick={toggleOpen} className={`toggle-wrap ${isOpen ? "open" : ""}`}>
          {toggleIcon}
        </div>
        </div>
        <ul className={`menu-links ${isOpen ? "open" : "closed"}`}>
            {renderLinks}
        </ul>
      </nav>
    </header>
  )
  
}


export default Header
