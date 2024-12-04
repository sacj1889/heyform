import { helper } from '@heyform-inc/utils'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import './home.css'
// import './main.css'

import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { useAsyncEffect, useQuery, useQueryURL, useRouter } from '@/utils'

const INVITATION_REGEX = /\/workspace\/[^\/]+\/invitation\/[^\/]+/i

const Home: FC = observer(() => {
  const router = useRouter()
  const query = useQuery()
  const workspaceStore = useStore('workspaceStore')
  const nextURL = useQueryURL('/workspace/create')

  useAsyncEffect(async () => {
    let list = workspaceStore.list
    const currentWorkspaceId = workspaceStore.currentWorkspaceId
    const redirectUri = query.redirect_uri

    if (INVITATION_REGEX.test(redirectUri)) {
      return router.redirect(redirectUri)
    }

    if (helper.isEmpty(list)) {
      const result = await WorkspaceService.workspaces()
      workspaceStore.setWorkspaces(result)

      if (helper.isEmpty(result)) {
        return router.redirect(nextURL)
      }

      list = result
    }

    if (helper.isValid(redirectUri)) {
      return router.redirect(redirectUri)
    }

    let workspaceId = list![0].id

    if (helper.isValid(currentWorkspaceId)) {
      const index = list!.findIndex(row => row.id === workspaceId)

      if (index > -1) {
        workspaceId = currentWorkspaceId!
      }
    }
    // router.replace(``)
    router.replace(`/workspace/${workspaceId}`)

  }, [workspaceStore.list])

  return <>
  {/* Hello world */}
  <div className="custom-google-fonts-enabled comps">
    <nav id="uni-navigation-bar" className="js-nav nav-02">
      <div className="container container--large">
        <div className="nav-02__box">
          <div className="nav-02__logo">
            <a className="nav-02__link" href="/" target="_self">
              <img
                className="nav-02__logo_img"
                height={80}
                alt="ZeroForm"
                src='static/favicon.svg' 
              />
            </a>
          </div>
          <div className="nav-02__links js-menu">
            <div className="nav-02__list_wrapper">
              <ul className="nav-02__list nav-02__list--desktop">
                <li className="nav-02__item">
                  <button className="button button--black-outline button--empty button--has-dropdown button--has-arrow js-toggle-dropdown">
                    <span className="button__text">Products</span>
                    <span className="dropdown">
                      <ul className="dropdown__list">
                        <li className="dropdown__item">
                          <a
                            href="waitlist"
                            target="_self"
                            className="button button--empty button--black-outline"
                          >
                            <span className="button__text">Survey</span>
                          </a>
                        </li>
                        <li className="dropdown__item">
                          <a
                            href="waitlist"
                            target="_self"
                            className="button button--empty button--black-outline"
                          >
                            <span className="button__text">Form</span>
                          </a>
                        </li>
                        <li className="dropdown__item">
                          <a
                            href="waitlist"
                            target="_self"
                            className="button button--empty button--black-outline"
                          >
                            <span className="button__text">Quiz</span>
                          </a>
                        </li>
                      </ul>
                    </span>
                  </button>
                </li>
                <li className="nav-02__item">
                  <a className="button button--black-outline button--empty" >
                    <span className="button__text">Dashboard</span>
                  </a>
                </li>
                <li className="nav-02__item">
                  <a
                    className="button button--black-outline button--empty"
                    href="/pricing"
                  >
                    <span className="button__text">Pricing</span>
                  </a>
                </li>
                <li className="nav-02__item">
                  <div className="buttons-set">
                    <ul className="buttons-set__list">
                      <li className="buttons-set__item">
                        <a
                          data-stripe-product-id=""
                          data-stripe-mode="payment"
                          data-successful-payment-url=""
                          data-cancel-payment-url=""
                          className="button button--accent-outline"
                          href="waitlist"
                          target=""
                        >
                          <span className="button__text">Get Started</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
              <ul className="nav-02__list nav-02__list--mobile">
                <li className="nav-02__item">
                  <button className="button button--black-outline button--empty button--has-dropdown button--has-arrow js-toggle-dropdown">
                    <span className="button__text">Products</span>
                    <span className="dropdown">
                      <ul className="dropdown__list">
                        <li className="dropdown__item">
                          <a
                            href="waitlist"
                            target="_self"
                            className="button button--empty button--black-outline"
                          >
                            <span className="button__text">Survey</span>
                          </a>
                        </li>
                        <li className="dropdown__item">
                          <a
                            href="waitlist"
                            target="_self"
                            className="button button--empty button--black-outline"
                          >
                            <span className="button__text">Form</span>
                          </a>
                        </li>
                        <li className="dropdown__item">
                          <a
                            href="waitlist"
                            target="_self"
                            className="button button--empty button--black-outline"
                          >
                            <span className="button__text">Quiz</span>
                          </a>
                        </li>
                      </ul>
                    </span>
                  </button>
                </li>
                <li className="nav-02__item">
                  <a className="button button--black-outline button--empty" >
                    <span className="button__text">Dashboard</span>
                  </a>
                </li>
                <li className="nav-02__item">
                  <a className="button button--black-outline button--empty" href="/pricing" >
                    <span className="button__text">Pricing</span>
                  </a>
                </li>
                <li className="nav-02__item">
                  <div className="buttons-set">
                    <ul className="buttons-set__list">
                      <li className="buttons-set__item">
                        <a
                          data-stripe-product-id=""
                          data-stripe-mode="payment"
                          data-successful-payment-url=""
                          data-cancel-payment-url=""
                          className="button button--accent-outline"
                          href="waitlist"
                          target=""
                        >
                          <span className="button__text">Get Started</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
            <div className="nav-02__burger">
              <button
                className="burger burger--black js-open-menu"
                type="button"
              >
                <div className="burger__box">
                  <div className="burger__inner" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div
      className="page-component__bg_image_box bg-custom-color first_component header-39-parent is-first-component"
      id="header-39-839891"
    >
      <div
        className="page-component__bg_overlay_box"
        style={{ backgroundColor: "#f6e3da" }}
      />
      <div
        className="page-component__wrapper"
        style={{ zIndex: 16, paddingTop: 120 }}
      >
        <header className="header-39 graphics-image default-graphics-video">
          <div className="container container--mid header-39__container">
            <div className="header-39__text_box">
              <h1 className="title-text heading">
                <span id="dynamic-word" className="fade-text" />
                <br />
                surveys, quizzes &amp; forms in mins
              </h1>
              <div className="subtitle-text content_box">
                <p>
                  <strong>UNLIMITED</strong> <strong>FORMS</strong> &amp;
                  <strong>RESPONSES</strong>—for <strong>FREE</strong>!
                  <br />
                  Add custom domains, file uploads &amp; embed forms anywhere.
                  Go wild with it!
                </p>
              </div>
            </div>
            <div className="header-39__buttons">
              <div className="buttons-set">
                <ul className="buttons-set__list">
                  <li className="buttons-set__item">
                    <a
                      data-stripe-product-id=""
                      data-stripe-mode="payment"
                      data-successful-payment-url=""
                      data-cancel-payment-url=""
                      className="button button--accent-outline"
                      href="waitlist"
                    >
                      <span className="button__text">Get Started Now</span>
                    </a>
                  </li>
                </ul>
                <div className="def-12_8 content-text content_box cta_bottom_info">
                  *Unlimited usage *No credit card required
                </div>
              </div>
            </div>
            <img
              className="header-39__image"
              alt=""
              src='static/favicon.svg' 
              width="1800px"
              height={500}
            />
          </div>
        </header>
      </div>
    </div>
    <div
      className="page-component__bg_image_box bg-custom-color links-04-parent is-not-first-component"
      id="features-02-737301"
    >
      <div
        className="page-component__bg_overlay_box"
        style={{ backgroundColor: "#f6e3da" }}
      />
      <div
        className="page-component__wrapper"
        style={{ zIndex: 15, paddingTop: 80, paddingBottom: 1 }}
      >
        <div className="links-04">
          <div className="container container--small">
            <div className="title-box title-box--center">
              <h2 className="title-text heading">
                Built to Fit Anywhere, Anytime!
              </h2>
            </div>
          </div>
          <div className="container container--mid">
            <ul className="links-04__list">
              <li className="sh-4 card-container links-04__item">
                <h3 className="def-18_72 title-text--inner links-04__title">
                  High Efficiency
                </h3>
                <div className="content-text links-04__text">
                  Experience a 50% increase in design speed with ZeroForm's
                  innovative software solutions
                </div>
                <div className="links-04__link feature__button_box" />
              </li>
              <li className="sh-4 card-container links-04__item">
                <h3 className="def-18_72 title-text--inner links-04__title">
                  High response rate
                </h3>
                <div className="content-text links-04__text">
                  Customers response more with our cool user-friendly design
                  interfaces
                </div>
                <div className="links-04__link feature__button_box" />
              </li>
              <li className="sh-4 card-container links-04__item">
                <h3 className="def-18_72 title-text--inner links-04__title">
                  99.98% Uptime
                </h3>
                <div className="content-text links-04__text">
                  With a 99.99% uptime, ZeroForm ensures your workflow process
                  is uninterrupted
                </div>
                <div className="links-04__link feature__button_box" />
              </li>
              <li className="sh-4 card-container links-04__item">
                <h3 className="def-18_72 title-text--inner links-04__title">
                  Choose from 100s of templates
                </h3>
                <div className="content-text links-04__text">
                  Variety of templates to create surveys, quizzes and other
                  forms
                </div>
                <div className="links-04__link feature__button_box" />
              </li>
              <li className="sh-4 card-container links-04__item">
                <h3 className="def-18_72 title-text--inner links-04__title">
                  AI analytics
                </h3>
                <div className="content-text links-04__text">
                  Get data analytics/reports and use that to elevate your
                  response rate further
                </div>
                <div className="links-04__link feature__button_box" />
              </li>
              <li className="sh-4 card-container links-04__item">
                <h3 className="def-18_72 title-text--inner links-04__title">
                  Interactive audio-guided option!
                </h3>
                <div className="content-text links-04__text">
                  Users can complete forms with voice prompts making the
                  experience even more engaging
                </div>
                <div className="links-04__link feature__button_box" />
              </li>
            </ul>
            <div className="bottom_cta">
              <div className="buttons-set">
                <ul className="buttons-set__list">
                  <li className="buttons-set__item">
                    <a
                      data-stripe-product-id=""
                      data-stripe-mode="payment"
                      data-successful-payment-url=""
                      data-cancel-payment-url=""
                      className="button button--alt-accent-bg"
                      href="waitlist"
                    >
                      <span className="button__text">Try ZeroForm</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      className="page-component__bg_image_box bg-custom-color posts-05-parent is-not-first-component"
      id="posts-05-299441"
    >
      <div
        className="page-component__bg_overlay_box"
        style={{ backgroundColor: "#f6e3da" }}
      />
      <div
        className="page-component__wrapper"
        style={{ zIndex: 14, paddingTop: 40, paddingBottom: 60 }}
      >
        <div className="posts-05">
          <div className="container container--small">
            <div className="title-box title-box--center">
              <h2 className="title-text heading">Our Solutions</h2>
              <div className="subtitle-text title-box__text content_box">
                <p>
                  Unlock data driven forms with Zeroform's AI powered solutions.
                </p>
              </div>
            </div>
          </div>
          <div className="container container--large">
            <div className="posts-05__wrapper">
              <div className="sh-4 card-container posts-05__item">
                <div
                  className="posts-05__img_box posts-05__img_box--small"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <img
                    className=""
                    alt=""
                    src='static/favicon.svg' 
                    height={160}
                    width={350}
                  />
                </div>
                <div className="posts-05__text">
                  <h3 className="posts-05__title">
                    <span className="title-text--inner def-18_72">
                      SurveyZ - AI Driven Survey Forms
                    </span>
                    <span className="content-text def-14 posts-05__title_info" />
                  </h3>
                  <div className="content-text posts-05__info content_box">
                    <p>
                      Unique AI-powered surveys analyze responses in real time,
                      revealing trends and optimizing questions to engage
                      participants better. Analytics-driven insights allow
                      dynamic adjustments to increase response rates, turning
                      every survey into a powerful tool.
                    </p>
                  </div>
                  <div className="posts-05__link">
                    <div className="feature__button_box">
                      <a
                        data-stripe-product-id=""
                        data-stripe-mode="payment"
                        data-successful-payment-url=""
                        data-cancel-payment-url=""
                        className="button button--empty button--accent-outline"
                        href="waitlist"
                      >
                        <span className="button__text">Try Now</span>
                        <span className="icon">
                          <svg
                            viewBox="0 0 13 10"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.823 4.164L8.954.182a.592.592 0 0 0-.854 0 .635.635 0 0 0 0 .88l2.836 2.92H.604A.614.614 0 0 0 0 4.604c0 .344.27.622.604.622h10.332L8.1 8.146a.635.635 0 0 0 0 .88.594.594 0 0 0 .854 0l3.869-3.982a.635.635 0 0 0 0-.88z"
                              fillRule="nonzero"
                              fill="#00396B"
                            />
                          </svg>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sh-4 card-container posts-05__item">
                <div
                  className="posts-05__img_box posts-05__img_box--small"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <img
                    className=""
                    alt=""
                    src='static/favicon.svg' 
                    height={160}
                    width={350}
                  />
                </div>
                <div className="posts-05__text">
                  <h3 className="posts-05__title">
                    <span className="title-text--inner def-18_72">
                      FormZ - Personalized Web Forms
                    </span>
                    <span className="content-text def-14 posts-05__title_info" />
                  </h3>
                  <div className="content-text posts-05__info content_box">
                    <p>
                      Form-builder empowers you to create dynamic web forms in
                      minutes. Tailor forms to any need, adjust on the fly, and
                      make each form unique—no coding required. Enjoy
                      flexibility and a seamless creation experience with robust
                      template options.
                    </p>
                  </div>
                  <div className="posts-05__link">
                    <div className="feature__button_box">
                      <a
                        data-stripe-product-id=""
                        data-stripe-mode="payment"
                        data-successful-payment-url=""
                        data-cancel-payment-url=""
                        className="button button--empty button--accent-outline"
                        href="waitlist"
                      >
                        <span className="button__text">Try Now</span>
                        <span className="icon">
                          <svg
                            viewBox="0 0 13 10"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.823 4.164L8.954.182a.592.592 0 0 0-.854 0 .635.635 0 0 0 0 .88l2.836 2.92H.604A.614.614 0 0 0 0 4.604c0 .344.27.622.604.622h10.332L8.1 8.146a.635.635 0 0 0 0 .88.594.594 0 0 0 .854 0l3.869-3.982a.635.635 0 0 0 0-.88z"
                              fillRule="nonzero"
                              fill="#00396B"
                            />
                          </svg>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sh-4 card-container posts-05__item">
                <div
                  className="posts-05__img_box posts-05__img_box--small"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <img
                    className=""
                    alt=""
                    src='static/favicon.svg' 
                    height={160}
                    width={350}
                  />
                </div>
                <div className="posts-05__text">
                  <h3 className="posts-05__title">
                    <span className="title-text--inner def-18_72">
                      QuizZ - Personalized Daily Quizzes
                    </span>
                    <span className="content-text def-14 posts-05__title_info" />
                  </h3>
                  <div className="content-text posts-05__info content_box">
                    <p>
                      Our popular Quiz feature lets teachers create daily
                      practice quizzes tailored to each lesson, in multiple
                      languages. These personalized quizzes adapt to each
                      student’s learning journey and supporting growth in a way
                      that’s engaging and easy to manage.
                    </p>
                  </div>
                  <div className="posts-05__link">
                    <div className="feature__button_box">
                      <a
                        data-stripe-product-id=""
                        data-stripe-mode="payment"
                        data-successful-payment-url=""
                        data-cancel-payment-url=""
                        className="button button--empty button--accent-outline"
                        href="waitlist"
                      >
                        <span className="button__text">Try Now</span>
                        <span className="icon">
                          <svg
                            viewBox="0 0 13 10"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.823 4.164L8.954.182a.592.592 0 0 0-.854 0 .635.635 0 0 0 0 .88l2.836 2.92H.604A.614.614 0 0 0 0 4.604c0 .344.27.622.604.622h10.332L8.1 8.146a.635.635 0 0 0 0 .88.594.594 0 0 0 .854 0l3.869-3.982a.635.635 0 0 0 0-.88z"
                              fillRule="nonzero"
                              fill="#00396B"
                            />
                          </svg>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bottom_cta" />
          </div>
        </div>
      </div>
    </div>
    <div
      className="page-component__bg_image_box page-component__bg_image_box--dark-bg bg-custom-color bg-custom-color--dark uni-is-dark-bg text-04-parent is-not-first-component"
      id="text-04-544861"
    >
      <div
        className="page-component__bg_overlay_box"
        style={{ backgroundColor: "#232323" }}
      />
      <div
        className="page-component__wrapper"
        style={{ zIndex: 12, paddingTop: 80, paddingBottom: 80 }}
      >
        <section>
          <div className="text--04">
            <div className="container container--mid">
              <div className="content_box text-white">
                <div className="content-text def-48 title-text text--04__big_text text-white">
                  <p>ZEROFORM - CREATE FORMS AT $0!</p>
                </div>
              </div>
              <div className="bottom_cta">
                <div className="buttons-set">
                  <ul className="buttons-set__list">
                    <li className="buttons-set__item">
                      <a
                        data-stripe-product-id=""
                        data-stripe-mode="payment"
                        data-successful-payment-url=""
                        data-cancel-payment-url=""
                        className="button button--white-bg"
                        href="waitlist"
                      >
                        <span className="button__text">Try ZeroForm</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <div
      className="page-component__bg_image_box bg-custom-color features-07-parent is-not-first-component"
      id="features-07-645831"
    >
      <div
        className="page-component__bg_overlay_box"
        style={{ backgroundColor: "#f6e3da" }}
      />
      <div
        className="page-component__wrapper"
        style={{ zIndex: 11, paddingTop: 60, paddingBottom: 10 }}
      >
        <div className="features-07 graphics-image default-graphics-image">
          <div className="container container--large">
            <div className="features-07__wrapper">
              <div className="features-07__main">
                <div className="features-07__main_content">
                  <div className="title-box">
                    <h2 className="title-text heading features-07__heading">
                      Dedicated Support
                    </h2>
                    <div className="subtitle-text title-box__text features-07__text content_box">
                      We're here to help you every step of the way.
                    </div>
                  </div>
                  <div className="buttons-set">
                    <ul className="buttons-set__list">
                      <li className="buttons-set__item">
                        <a
                          data-stripe-product-id=""
                          data-stripe-mode="payment"
                          data-successful-payment-url=""
                          data-cancel-payment-url=""
                          className="button button--white-bg"
                          href="waitlist"
                        >
                          <span className="button__text">Get in touch</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="features-07__visual">
                <div className="features-07__img_box">
                  <img
                    loading="lazy"
                    className="features-07__img"
                    alt="eWalle illustration 2"
                    src="https://unicorn-images.b-cdn.net/9e1005bf-5705-4ab8-be91-b764ca4a6469?optimizer=gif"
                    srcSet="
                        https://unicorn-images.b-cdn.net/9e1005bf-5705-4ab8-be91-b764ca4a6469?optimizer=gif&width=290&height=208   290w,
                        https://unicorn-images.b-cdn.net/9e1005bf-5705-4ab8-be91-b764ca4a6469?optimizer=gif&width=345&height=247   345w,
                        https://unicorn-images.b-cdn.net/9e1005bf-5705-4ab8-be91-b764ca4a6469?optimizer=gif&width=395&height=283   395w,
                        https://unicorn-images.b-cdn.net/9e1005bf-5705-4ab8-be91-b764ca4a6469?optimizer=gif&width=570&height=408   570w,
                        https://unicorn-images.b-cdn.net/9e1005bf-5705-4ab8-be91-b764ca4a6469?optimizer=gif&width=670&height=480   670w,
                        https://unicorn-images.b-cdn.net/9e1005bf-5705-4ab8-be91-b764ca4a6469?optimizer=gif&width=369&height=264   369w,
                        https://unicorn-images.b-cdn.net/9e1005bf-5705-4ab8-be91-b764ca4a6469?optimizer=gif&width=585&height=419   585w,
                        https://unicorn-images.b-cdn.net/9e1005bf-5705-4ab8-be91-b764ca4a6469?optimizer=gif&width=580&height=416   580w,
                        https://unicorn-images.b-cdn.net/9e1005bf-5705-4ab8-be91-b764ca4a6469?optimizer=gif&width=690&height=494   690w,
                        https://unicorn-images.b-cdn.net/9e1005bf-5705-4ab8-be91-b764ca4a6469?optimizer=gif&width=790&height=566   790w,
                        https://unicorn-images.b-cdn.net/9e1005bf-5705-4ab8-be91-b764ca4a6469?optimizer=gif&width=1140&height=816 1140w,
                        https://unicorn-images.b-cdn.net/9e1005bf-5705-4ab8-be91-b764ca4a6469?optimizer=gif&width=1198&height=857 1198w,
                        https://unicorn-images.b-cdn.net/9e1005bf-5705-4ab8-be91-b764ca4a6469?optimizer=gif&width=870&height=624   870w,
                        https://unicorn-images.b-cdn.net/9e1005bf-5705-4ab8-be91-b764ca4a6469?optimizer=gif&width=1035&height=741 1035w,
                        https://unicorn-images.b-cdn.net/9e1005bf-5705-4ab8-be91-b764ca4a6469?optimizer=gif&width=1185&height=849 1185w,
                        https://unicorn-images.b-cdn.net/9e1005bf-5705-4ab8-be91-b764ca4a6469?optimizer=gif&width=1198&height=857 1198w
                        "
                    sizes="(max-width: 320px) 290px,(max-width: 375px) 345px,(max-width: 425px) 395px,(max-width: 600px) 570px,(max-width: 700px) 670px,(max-width: 768px) 369px,585px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      className="page-component__bg_image_box bg-custom-color features-06-parent is-not-first-component"
      id="features-06-148571"
    >
      <div
        className="page-component__bg_overlay_box"
        style={{ backgroundColor: "#f6e3da" }}
      />
      <div
        className="page-component__wrapper"
        style={{ zIndex: 10, paddingTop: 80, paddingBottom: 80 }}
      >
        <div className="features-06 graphics-image default-graphics-image">
          <div className="container container--large">
            <div className="features-06__wrapper">
              <div className="features-06__main">
                <div className="features-06__main_content">
                  <div className="title-box">
                    <h2 className="title-text heading features-06__heading">
                      Custom Solutions
                    </h2>
                    <div className="subtitle-text title-box__text features-06__text content_box">
                      Tailored software solutions to meet your unique needs.
                    </div>
                  </div>
                  <div className="buttons-set">
                    <ul className="buttons-set__list">
                      <li className="buttons-set__item">
                        <a
                          data-stripe-product-id=""
                          data-stripe-mode="payment"
                          data-successful-payment-url=""
                          data-cancel-payment-url=""
                          className="button button--white-bg"
                          href="waitlist"
                        >
                          <span className="button__text">Get in touch</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="features-06__visual">
                <div className="features-06__img_box">
                  <img
                    loading="lazy"
                    className="features-06__img"
                    alt="eWalle illustration 1"
                    src="https://unicorn-images.b-cdn.net/5f0b6a7e-d7ed-4f62-8c3f-7cfcb3faff12?optimizer=gif"
                    srcSet="
                        https://unicorn-images.b-cdn.net/5f0b6a7e-d7ed-4f62-8c3f-7cfcb3faff12?optimizer=gif&width=290&height=203   290w,
                        https://unicorn-images.b-cdn.net/5f0b6a7e-d7ed-4f62-8c3f-7cfcb3faff12?optimizer=gif&width=345&height=241   345w,
                        https://unicorn-images.b-cdn.net/5f0b6a7e-d7ed-4f62-8c3f-7cfcb3faff12?optimizer=gif&width=395&height=276   395w,
                        https://unicorn-images.b-cdn.net/5f0b6a7e-d7ed-4f62-8c3f-7cfcb3faff12?optimizer=gif&width=570&height=399   570w,
                        https://unicorn-images.b-cdn.net/5f0b6a7e-d7ed-4f62-8c3f-7cfcb3faff12?optimizer=gif&width=670&height=468   670w,
                        https://unicorn-images.b-cdn.net/5f0b6a7e-d7ed-4f62-8c3f-7cfcb3faff12?optimizer=gif&width=369&height=258   369w,
                        https://unicorn-images.b-cdn.net/5f0b6a7e-d7ed-4f62-8c3f-7cfcb3faff12?optimizer=gif&width=585&height=409   585w,
                        https://unicorn-images.b-cdn.net/5f0b6a7e-d7ed-4f62-8c3f-7cfcb3faff12?optimizer=gif&width=580&height=406   580w,
                        https://unicorn-images.b-cdn.net/5f0b6a7e-d7ed-4f62-8c3f-7cfcb3faff12?optimizer=gif&width=690&height=482   690w,
                        https://unicorn-images.b-cdn.net/5f0b6a7e-d7ed-4f62-8c3f-7cfcb3faff12?optimizer=gif&width=790&height=552   790w,
                        https://unicorn-images.b-cdn.net/5f0b6a7e-d7ed-4f62-8c3f-7cfcb3faff12?optimizer=gif&width=1131&height=790 1131w,
                        https://unicorn-images.b-cdn.net/5f0b6a7e-d7ed-4f62-8c3f-7cfcb3faff12?optimizer=gif&width=870&height=609   870w,
                        https://unicorn-images.b-cdn.net/5f0b6a7e-d7ed-4f62-8c3f-7cfcb3faff12?optimizer=gif&width=1035&height=723 1035w,
                        https://unicorn-images.b-cdn.net/5f0b6a7e-d7ed-4f62-8c3f-7cfcb3faff12?optimizer=gif&width=1131&height=790 1131w
                        "
                    sizes="(max-width: 320px) 290px,(max-width: 375px) 345px,(max-width: 425px) 395px,(max-width: 600px) 570px,(max-width: 700px) 670px,(max-width: 768px) 369px,585px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="popup-component js-custom-popup page-component__bg_image_box bg-white-color first_component popup-component_no-image popup-01-parent is-not-first-component"      id="popup-01-success_default">
      <button className="popup-component__close-button js-close-custom-popup-button">
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20.0806 17.9986L30.6275 5.42673C30.8043 5.2178 30.6556 4.90039 30.3824 4.90039H27.1762C26.9873 4.90039 26.8065 4.98477 26.682 5.12941L17.9833 15.4995L9.28465 5.12941C9.16411 4.98477 8.98331 4.90039 8.79045 4.90039H5.5842C5.31099 4.90039 5.16233 5.2178 5.33911 5.42673L15.886 17.9986L5.33911 30.5705C5.29951 30.6171 5.2741 30.674 5.26591 30.7346C5.25771 30.7952 5.26708 30.8568 5.29288 30.9122C5.31869 30.9677 5.35985 31.0145 5.41149 31.0472C5.46313 31.0799 5.52307 31.0972 5.5842 31.0968H8.79045C8.97929 31.0968 9.16009 31.0124 9.28465 30.8678L17.9833 20.4977L26.682 30.8678C26.8025 31.0124 26.9833 31.0968 27.1762 31.0968H30.3824C30.6556 31.0968 30.8043 30.7794 30.6275 30.5705L20.0806 17.9986Z"
            fill="white"
          />
        </svg>
      </button>
      <div className="popup-component__bg_image_box">
        <div className="page-component__bg_overlay_box" style={{}} />
        <div
          className="page-component__wrapper"
          style={{ zIndex: 10, paddingTop: 1, paddingBottom: 1 }}
        >
          <div className="popup-01 graphics-image default-graphics-image">
            <div className="container container--premid popup-01__container">
              <div className="popup-01__left">
                <div className="popup-01__content">
                  <h2 className="title-text heading popup-01__heading">
                    Submission Successful
                  </h2>
                  <p className="subtitle-text content_box popup-01__text">
                    The form has been successfully submitted.
                  </p>
                  <div className="popup-01__cta-box">
                    <div className="buttons-set">
                      <ul className="buttons-set__list">
                        <li className="buttons-set__item">
                          <a
                            data-stripe-product-id=""
                            data-stripe-mode="payment"
                            data-successful-payment-url=""
                            data-cancel-payment-url=""
                            className="button button--black-bg"
                            href="/"
                            target="_blank"
                            onclick="event.preventDefault(); window.unicornplatform.closeAllPopups();"
                          >
                            <span className="button__text">Back to site</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-custom-color">
      <footer
        className="footer-04 footer-04--dark"
        id="footer"
        style={{ backgroundColor: "#232323" }}
      >
        <div className="footer-04__top">
          <div className="container">
            <div className="footer-04__top_wrapper text-white">
              <div className="footer-04__col">
                <div className="content-text def-14 footer-04__info content_box">
                  <p>
                    © 2024 Inayara Tech Pvt Ltd.
                    <br />
                    All rights reserved.
                  </p>
                </div>
              </div>
              <div className="footer-04__col">
                <h3 className="def-18_72 title-text--inner footer-04__title">
                  Company
                </h3>
                <ul className="footer-04__list">
                  <li className="footer-04__item">
                    <a
                      href="mailto:support@bigfig.ai"
                      className="content-text def-14 footer-04__link"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer-04__col">
                <h3 className="def-18_72 title-text--inner footer-04__title">
                  Resources
                </h3>
                <ul className="footer-04__list">
                  <li className="footer-04__item">
                    <a
                      href="mailto:support@bigfig.ai"
                      className="content-text def-14 footer-04__link"
                    >
                      Support
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer-04__col">
                <h3 className="def-18_72 title-text--inner footer-04__title">
                  Follow Us
                </h3>
                <div className="footer-04__social_box">
                  <div className="social-buttons social-buttons--left">
                    <ul className="social-buttons__list">
                      <li className="social-buttons__item">
                        <a
                          className="social-buttons__link social-buttons__link--facebook"
                          href="https://www.facebook.com/ZeroForm"
                        >
                          <img
                            loading="lazy"
                            className="social-buttons__icon"
                            alt="facebook icon"
                            src='static/favicon.svg' 
                          />
                        </a>
                      </li>
                      <li className="social-buttons__item">
                        <a
                          className="social-buttons__link social-buttons__link--instagram"
                          href="https://www.instagram.com/ZeroForm"
                        >
                          <img
                            loading="lazy"
                            className="social-buttons__icon"
                            alt="instagram icon"
                            src='static/favicon.svg' 
                          />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-04__bottom">
            <div className="container">
              <div className="footer-04__bottom_wrapper footer-04__bottom_wrapper--center">
                <ul className="footer-04__bottom_links text-white">
                  <li className="footer-04__bottom_links_item">
                    <a
                      target="_blank"
                      href="mailto:support@bigfig.ai"
                      className="content-text def-12 footer-04__bottom_link footer-04__bottom_item"
                    >
                      Email
                    </a>
                  </li>
                  <li className="footer-04__bottom_links_item">
                    <a
                      target="_blank"
                      href="tel:+91-9999748357"
                      className="content-text def-12 footer-04__bottom_link footer-04__bottom_item"
                    >
                      Phone
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</>

  
})

export default Home
