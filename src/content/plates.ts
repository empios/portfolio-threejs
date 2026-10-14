/** Selected work. Visible copy for each project lives in `site/copy.ts`. */

/** Keys the project to its diagram in `components/figures`. */
export type FigureId =
  | 'enterprise'
  | 'translation'
  | 'photographic'
  | 'reference'
  | 'cada'
  | 'humanize'
  | 'pangolin';

export type PlateGroup = 'commercial' | 'workshop';

export interface Plate {
  readonly group: PlateGroup;
  readonly figure: FigureId;
  /** Tool names travel untranslated. */
  readonly stack: readonly string[];
  readonly source?: string;
}

export const PLATES: readonly Plate[] = [
  { group: 'commercial', figure: 'enterprise', stack: ['Python', 'FastAPI', 'LLM Integration', 'PostgreSQL', 'Docker'] },
  { group: 'commercial', figure: 'translation', stack: ['Python', 'FastAPI', 'CTranslate2', 'PostgreSQL'] },
  { group: 'commercial', figure: 'photographic', stack: ['PyTorch', 'YOLOv8-seg', 'LaMa', 'OpenCV'] },
  { group: 'commercial', figure: 'reference', stack: ['LangGraph', 'llama.cpp', 'FAISS', 'Docker'] },
  { group: 'workshop', figure: 'cada', stack: ['Rust', 'Tauri', 'WinFSP', 'SQLite FTS5', 'Ollama'], source: 'https://github.com/empios/CaDa' },
  { group: 'workshop', figure: 'humanize', stack: ['Python', 'Stanza', 'sentence-transformers', 'DOCX'], source: 'https://github.com/empios/humanize-pl' },
  { group: 'workshop', figure: 'pangolin', stack: ['tokens.css', 'base.css', 'components.css', 'tweaks-panel.jsx'], source: 'https://github.com/empios/Pangolin' },
];
