import React from 'react';

export interface Variable {
  symbol: string;
  desc: string;
}

export interface Formula {
  latex: string;
  desc?: string;
  variables?: Variable[];
}

export interface Subsection {
  title: string;
  important?: string | string[];
  formulas?: Formula[];
}

export interface ContentSection {
  subtitle: string;
  text?: string;
  important?: string | string[];
  formulas?: Formula[];
  graphType?: string;
  subsections?: Subsection[];
}

export interface Section {
  id: string;
  title: string;
  sections: ContentSection[];
}
