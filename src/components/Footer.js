import React from 'react'
import { Link } from 'gatsby'

export default function Footer() {
  return (
    <footer className="footer flex">
      <section className="container">
        <nav className="footer-links">
          <Link to="/blog">Blog</Link>
          <Link to="/me">About</Link>
          <Link to="/rss.xml">RSS</Link>
        </nav>
        <nav className="flex justify-center">
          Ahmad Saufi Maulana • 2021 • Theme by Tania
        </nav>
      </section>
    </footer>
  )
}
