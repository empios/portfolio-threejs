import type { FigureId } from '../content/plates';

/**
 * The engraved figures. All colour, weight and type live in `.fo-fig` in
 * folio.css, so these stay what they are — geometry and a description.
 */

interface FigureProps {
  /** Sentence describing the mechanism, for readers who cannot see it. */
  readonly label: string;
}

function Figure({ label, children }: FigureProps & { readonly children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 300 176" role="img" aria-label={label} className="fo-fig">
      {children}
    </svg>
  );
}

/** A grid of nine dots — the folio's mark for an index. */
function DotGrid({ x, y, step = 9 }: { readonly x: number; readonly y: number; readonly step?: number }) {
  return (
    <>
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => (
          <circle
            key={`${row}-${col}`}
            className="ink"
            cx={x + col * step}
            cy={y + row * step}
            r={1.4}
          />
        )),
      )}
    </>
  );
}

/** An arrowhead, drawn open at the end of a run. */
function Arrow({ x, y }: { readonly x: number; readonly y: number }) {
  return <polyline points={`${x - 4},${y - 4} ${x},${y} ${x - 4},${y + 4}`} />;
}

function TranslationFigure() {
  return (
    <Figure label="Diagram of the translation pipeline: source rows flow through machine translation and a three-stage QA circuit before shipping">
      <ellipse cx="40" cy="42" rx="20" ry="7" />
      <line x1="20" y1="42" x2="20" y2="92" />
      <line x1="60" y1="42" x2="60" y2="92" />
      <ellipse cx="40" cy="92" rx="20" ry="7" opacity="0.7" />
      <line x1="66" y1="67" x2="90" y2="67" />
      <Arrow x={90} y={67} />
      <circle cx="114" cy="67" r="17" />
      <text className="mark" x="114" y="71" textAnchor="middle">
        MT
      </text>
      <line x1="131" y1="67" x2="148" y2="67" />
      <Arrow x={148} y={67} />
      {[161, 191, 221].map((cx, i) => (
        <g key={cx}>
          <circle cx={cx} cy="67" r="11" />
          <text className="mark mark--sm" x={cx} y="71" textAnchor="middle">
            {i + 1}
          </text>
        </g>
      ))}
      <line x1="172" y1="67" x2="180" y2="67" />
      <line x1="202" y1="67" x2="210" y2="67" />
      <line x1="150" y1="46" x2="232" y2="46" opacity="0.6" />
      <line x1="150" y1="46" x2="150" y2="52" opacity="0.6" />
      <line x1="232" y1="46" x2="232" y2="52" opacity="0.6" />
      <text className="lbl" x="191" y="38" textAnchor="middle">
        Q·A CIRCUIT
      </text>
      <line x1="232" y1="67" x2="252" y2="67" />
      <Arrow x={252} y={67} />
      <rect x="254" y="59" width="16" height="16" />
      <polyline className="dash" points="191,78 191,140 114,140 114,88" opacity="0.55" />
      <polyline points="110,92 114,88 118,92" opacity="0.55" />
      <text className="lbl" x="40" y="116" textAnchor="middle">
        ROWS ≈10⁶
      </text>
      <text className="lbl" x="262" y="94" textAnchor="middle">
        SHIPPED
      </text>
      <text className="lbl" x="152" y="156" textAnchor="middle">
        RETURNED FOR REVISION
      </text>
    </Figure>
  );
}

function PhotographicFigure() {
  return (
    <Figure label="Diagram of the photo pipeline: a subject is masked in the first frame and its background restored in the second">
      <rect x="18" y="24" width="104" height="104" />
      {/* Hatching, as on a plate that has been cut away. */}
      {[
        [24, 40, 40, 24],
        [24, 54, 54, 24],
        [24, 68, 68, 24],
        [100, 124, 118, 106],
        [84, 124, 118, 90],
        [68, 124, 118, 74],
      ].map(([x1, y1, x2, y2]) => (
        <line key={`${x1}-${y1}`} x1={x1} y1={y1} x2={x2} y2={y2} opacity="0.3" />
      ))}
      <circle cx="70" cy="76" r="26" />
      <circle className="dash--wide" cx="70" cy="76" r="33" opacity="0.8" />
      <line x1="130" y1="76" x2="152" y2="76" />
      <Arrow x={152} y={76} />
      <rect x="160" y="24" width="104" height="104" />
      <circle cx="212" cy="76" r="26" />
      <ellipse cx="212" cy="110" rx="20" ry="4" opacity="0.4" />
      <text className="lbl" x="70" y="150" textAnchor="middle">
        FIG. A · YOLO-SEG MASK
      </text>
      <text className="lbl" x="212" y="150" textAnchor="middle">
        FIG. B · LAMA INFILL
      </text>
    </Figure>
  );
}

function ReferenceFigure() {
  return (
    <Figure label="Diagram of the retrieval system: documents feed an index, the index feeds a local language model, answers pass a verifier">
      <rect x="36" y="26" width="28" height="18" />
      <rect x="41" y="31" width="28" height="18" />
      <rect x="46" y="36" width="28" height="18" />
      <text className="lbl" x="58" y="72" textAnchor="middle">
        DOCS
      </text>
      <rect x="38" y="96" width="32" height="32" />
      <DotGrid x={46} y={104} step={8} />
      <text className="lbl" x="54" y="146" textAnchor="middle">
        INDEX
      </text>
      <line x1="57" y1="58" x2="54" y2="92" opacity="0.7" />
      <polyline points="50,88 54,92 58,88" opacity="0.7" />
      <line x1="72" y1="110" x2="126" y2="88" opacity="0.7" />
      <polyline points="120,86 126,88 122,93" opacity="0.7" />
      <circle cx="150" cy="80" r="22" />
      <text className="mark" x="150" y="84" textAnchor="middle">
        LLM
      </text>
      <text className="lbl" x="150" y="120" textAnchor="middle">
        LLAMA.CPP · LOCAL
      </text>
      <circle className="dash" cx="198" cy="36" r="12" />
      <text className="lbl" x="198" y="16" textAnchor="middle">
        VERIFIER
      </text>
      <line className="dash" x1="164" y1="64" x2="188" y2="45" opacity="0.6" />
      <line className="dash" x1="209" y1="43" x2="238" y2="66" opacity="0.6" />
      <circle cx="252" cy="80" r="16" />
      <text className="mark mark--sm" x="252" y="84" textAnchor="middle">
        A
      </text>
      <text className="lbl" x="252" y="120" textAnchor="middle">
        ANSWER
      </text>
      <line x1="172" y1="80" x2="232" y2="80" />
      <Arrow x={232} y={80} />
      <text className="lbl" x="150" y="168" textAnchor="middle">
        ORCHESTRATED WITH LANGGRAPH
      </text>
    </Figure>
  );
}

function CadaFigure() {
  return (
    <Figure label="Diagram of CADA: files flow into a virtual drive, an index, and a local agent whose actions pass human review">
      <rect x="20" y="42" width="26" height="18" />
      <rect x="26" y="50" width="26" height="18" />
      <text className="lbl" x="36" y="92" textAnchor="middle">
        FILES
      </text>
      <line x1="58" y1="60" x2="82" y2="60" />
      <Arrow x={82} y={60} />
      <rect className="dash--wide" x="86" y="34" width="54" height="52" />
      <text className="mark mark--lg" x="113" y="64" textAnchor="middle">
        X:
      </text>
      <text className="lbl" x="113" y="104" textAnchor="middle">
        VIRTUAL DRIVE
      </text>
      <line x1="140" y1="60" x2="164" y2="60" />
      <Arrow x={164} y={60} />
      <rect x="168" y="42" width="36" height="36" />
      <DotGrid x={177} y={51} />
      <text className="lbl" x="186" y="104" textAnchor="middle">
        INDEX
      </text>
      <line x1="204" y1="60" x2="224" y2="60" />
      <Arrow x={224} y={60} />
      <circle cx="246" cy="60" r="18" />
      <text className="mark mark--xs" x="246" y="64" textAnchor="middle">
        AGENT
      </text>
      <line className="dash" x1="246" y1="78" x2="246" y2="106" opacity="0.6" />
      <circle className="dash" cx="246" cy="120" r="13" />
      <text className="mark mark--xxs" x="246" y="124" textAnchor="middle">
        YOU
      </text>
      <text className="lbl" x="246" y="152" textAnchor="middle">
        HUMAN REVIEW
      </text>
      <text className="lbl" x="150" y="170" textAnchor="middle">
        ALL LOCAL — NOTHING LEAVES THE MACHINE
      </text>
    </Figure>
  );
}

function HumanizeFigure() {
  return (
    <Figure label="Diagram of humanize-pl: an AI draft passes through validator gates; rejected candidates drop out, legal prose emerges">
      <rect x="22" y="34" width="56" height="72" />
      {[
        [30, 50, 70],
        [30, 62, 70],
        [30, 74, 62],
        [30, 86, 70],
      ].map(([x1, y, x2]) => (
        <line key={y} x1={x1} y1={y} x2={x2} y2={y} opacity="0.5" />
      ))}
      <text className="lbl" x="50" y="126" textAnchor="middle">
        AI DRAFT
      </text>
      <line x1="82" y1="70" x2="100" y2="70" />
      <Arrow x={100} y={70} />
      {/* Three gates, set on point. */}
      {[110, 138, 166].map((x) => (
        <rect
          key={x}
          x={x}
          y="62"
          width="15"
          height="15"
          transform={`rotate(45 ${x + 7.5} 69.5)`}
        />
      ))}
      <line x1="129" y1="70" x2="135" y2="70" opacity="0.6" />
      <line x1="157" y1="70" x2="163" y2="70" opacity="0.6" />
      <line x1="106" y1="42" x2="185" y2="42" opacity="0.6" />
      <line x1="106" y1="42" x2="106" y2="48" opacity="0.6" />
      <line x1="185" y1="42" x2="185" y2="48" opacity="0.6" />
      <text className="lbl" x="146" y="34" textAnchor="middle">
        VALIDATOR GATES
      </text>
      <line className="dash" x1="146" y1="82" x2="146" y2="120" opacity="0.55" />
      <text className="lbl" x="146" y="136" textAnchor="middle">
        REJECTED
      </text>
      <line x1="186" y1="70" x2="202" y2="70" />
      <Arrow x={202} y={70} />
      <rect x="206" y="34" width="56" height="72" />
      {[
        [214, 50, 254],
        [214, 62, 254],
        [214, 74, 246],
        [214, 86, 254],
      ].map(([x1, y, x2]) => (
        <line key={y} x1={x1} y1={y} x2={x2} y2={y} opacity="0.8" />
      ))}
      <text className="lbl" x="234" y="126" textAnchor="middle">
        LEGAL PROSE
      </text>
      <text className="lbl" x="150" y="168" textAnchor="middle">
        NO GENERATIVE MODEL IN THE LOOP
      </text>
    </Figure>
  );
}

function PangolinFigure() {
  return (
    <Figure label="Specimen sheet of the Pangolin design system: type sample, three colour swatches, a radius sample and a spacing ruler">
      <rect x="20" y="24" width="122" height="104" />
      <text className="specimen" x="81" y="94" textAnchor="middle">
        Aa
      </text>
      <text className="lbl lbl--sm" x="81" y="118" textAnchor="middle">
        CORMORANT · UBUNTU
      </text>
      <text className="lbl" x="81" y="148" textAnchor="middle">
        TYPE SPECIMEN
      </text>
      <rect className="ink" x="170" y="28" width="22" height="22" />
      <rect className="wax" x="200" y="28" width="22" height="22" />
      <rect x="230" y="28" width="22" height="22" />
      <text className="lbl" x="211" y="70" textAnchor="middle">
        INK · WAX · PAPER
      </text>
      <rect x="170" y="84" width="58" height="30" rx="9" />
      <text className="lbl" x="199" y="132" textAnchor="middle">
        RADII 6–12
      </text>
      <line x1="170" y1="150" x2="282" y2="150" />
      {Array.from({ length: 8 }, (_, i) => 170 + i * 16).map((x) => (
        <line key={x} x1={x} y1="145" x2={x} y2="150" />
      ))}
      <line x1="282" y1="145" x2="282" y2="150" />
      <text className="lbl" x="226" y="166" textAnchor="middle">
        SPACING SCALE
      </text>
    </Figure>
  );
}

export const FIGURES: Readonly<Record<FigureId, () => React.ReactElement>> = {
  translation: TranslationFigure,
  photographic: PhotographicFigure,
  reference: ReferenceFigure,
  cada: CadaFigure,
  humanize: HumanizeFigure,
  pangolin: PangolinFigure,
};

/** Drawn by hand on the frontispiece when WebGL declines to. */
export function ArmillaryFallback() {
  return (
    <svg viewBox="0 0 400 400" className="fo-fig">
      <circle cx="200" cy="200" r="150" />
      <circle cx="200" cy="200" r="172" opacity="0.35" />
      <ellipse cx="200" cy="200" rx="150" ry="40" />
      <ellipse cx="200" cy="200" rx="150" ry="40" transform="rotate(60 200 200)" opacity="0.55" />
      <ellipse cx="200" cy="200" rx="150" ry="40" transform="rotate(-60 200 200)" opacity="0.55" />
      <ellipse cx="200" cy="126" rx="122" ry="30" opacity="0.4" />
      <ellipse cx="200" cy="274" rx="122" ry="30" opacity="0.4" />
      <circle cx="200" cy="200" r="34" opacity="0.6" />
      <line x1="200" y1="16" x2="200" y2="384" />
    </svg>
  );
}
