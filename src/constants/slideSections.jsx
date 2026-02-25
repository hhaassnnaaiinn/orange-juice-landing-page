/**
 * Section content for the horizontal slides (About, Benefits, Contact).
 * Content is defined here so Slides component stays presentational.
 */
export const SLIDE_SECTIONS = [
  {
    id: 'about',
    title: 'Our Product',
    long: false,
    content: (
      <>
        <h1 className="section-heading">Pure orange. Nothing else.</h1>
        <p className="section-lead">
          Freshly squeezed from ripe oranges, our juice is 100% natural with no added sugars.
        </p>
        <img
          className="section-image section-image--bottle"
          src="/orange-juice-bottle.png"
          alt="Orange Juice bottle – pure and natural"
        />
      </>
    ),
  },
  {
    id: 'benefits',
    title: 'Benefits',
    long: true,
    content: (
      <>
        <h1 className="section-heading">Why choose us</h1>
        <p className="section-lead section-lead--long">
          A few reasons to love our juice.
        </p>
        <div className="section-body">
          <p>Rich in Vitamin C to support your immune system.</p>
          <p>No added sugars — only the natural sweetness of oranges.</p>
          <p>Squeezed from fresh oranges for a real, fruity taste.</p>
          <p>Simple ingredients: just oranges. No concentrates or preservatives.</p>
          <p>Perfect any time: breakfast, post-workout, or a quick refresh.</p>
          <p>Taste the sunshine in every sip.</p>
          <p>Natural goodness in every drop.</p>
          <p>Fresh. Simple. Real.</p>
          <p className="section-body-end">Thank you for scrolling.</p>
        </div>
      </>
    ),
  },
  {
    id: 'contact',
    title: 'Contact',
    long: false,
    content: (
      <>
        <h1 className="section-heading">Get in touch</h1>
        <p className="section-lead">
          Questions or want to find us in stores? We'd love to hear from you.
        </p>
        <a
          href="mailto:hello@orangejuice.example"
          className="section-cta"
          aria-label="Email us at hello at orangejuice dot example"
        >
          hello@orangejuice.example
        </a>
        <img
          className="section-image section-image--bottle"
          src="/orange-juice-bottle.png"
          alt="Orange Juice bottle"
        />
      </>
    ),
  },
]
