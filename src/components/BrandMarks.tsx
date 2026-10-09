/**
 * Brand plates for the company frames. Built to match the marks supplied by Femi:
 * Carlyle — white serif "C" on a navy / sky-blue diagonal field;
 * T. Rowe Price — white serif wordmark on the firm's blue.
 * If an official file is added at /public/logos/{carlyle,trowe}.svg it is used instead.
 */
export function CarlylePlate() {
  return (
    <svg className="plate plate--carlyle" viewBox="0 0 300 200" role="img" aria-label="The Carlyle Group">
      <rect width="300" height="200" fill="#9DD5F6" />
      <path d="M0 0H300L0 196Z" fill="#1B2347" />
      <text x="150" y="165" textAnchor="middle" fill="#fff" fontFamily="var(--font-display), 'Cormorant Garamond', Garamond, serif" fontWeight="600" fontSize="210">C</text>
    </svg>
  )
}

export function TRowePlate() {
  return (
    <svg className="plate plate--trowe" viewBox="0 0 300 120" role="img" aria-label="T. Rowe Price">
      <rect width="300" height="120" fill="#174A6E" />
      <text x="150" y="74" textAnchor="middle" fill="#fff" fontFamily="var(--font-serif), 'EB Garamond', Garamond, serif" fontWeight="500" fontSize="44" letterSpacing="-0.5">T.<tspan dx="2">Rowe</tspan><tspan dx="3">Price</tspan></text>
    </svg>
  )
}
