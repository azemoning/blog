import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import config from '../utils/config'
// import takeNote from '../../content/images/takenoteproject.png'
// import laconia from '../../content/images/laconiaproject.png'
// import primitive from '../../content/images/primitiveproject.png'
// import chip8 from '../../content/images/chip8project.png'

export default function ProjectsIndex() {
  return (
    <Layout>
      <Helmet title={`Projects | ${config.siteTitle}`} />
      <SEO />
      <div className="container page">
        <header>
          <h1>Projects.</h1>
          <p className="subtitle">
            Under construction 👷🏼‍♂️
            {/* A few highlights of my open-source projects. View them all{' '}
            <a href="https://github.com/azemoning">on GitHub</a>. */}
          </p>
        </header>

        {/* <section>
          <h2>TakeNote</h2>
          <h4 className="no-underline">
            A free, open source notes app for the web.
          </h4>
          <p>
            <small>
              <i>
                2020 &mdash; TypeScript, React/Redux, Node/Express, GitHub OAuth
              </i>
            </small>
          </p>
          <p>
            I built this app because I wanted a simpler, IDE-like, WYSIWYG-free
            note-taking program that would be accessible from any platform via
            the web. I also wanted it to sync without creating users or
            requiring a database.
          </p>
          <p>
            The app allows plain text or markdown with previews, syncing,
            internal wiki style note-linking, drag-and-drop, prettier, syntax
            highlighting, light/dark mode, search, categorizing, and more!
          </p>

          <Link to="/building-takenote" className="button">
            Write-up
          </Link>
          <a href="https://github.com/taniarascia/takenote" className="button">
            Source
          </a>
          <a href="https://takenote.dev/app" className="button">
            Demo
          </a>
        </section> */}
      </div>
    </Layout>
  )
}
