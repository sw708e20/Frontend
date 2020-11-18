import '../../i18n/i18n';
import React from "react";


import NavbarComponent from "../../pages/commons/Navbar";

test('test default lang', () => {
  expect((new NavbarComponent({})).getButtonText("ab")).toMatchObject(<span className="flag-icon flag-icon-gb" />);
});

test('test en lang', () => {
  expect((new NavbarComponent({})).getButtonText("en")).toMatchObject(<span className="flag-icon flag-icon-gb" />);
});

test('test da lang', () => {
  expect((new NavbarComponent({})).getButtonText("da")).toMatchObject(<span className="flag-icon flag-icon-dk" />);
});

test('test DA lang', () => {
  expect((new NavbarComponent({})).getButtonText("DA")).toMatchObject(<span className="flag-icon flag-icon-dk" />);
});

test('test EN lang', () => {
  expect((new NavbarComponent({})).getButtonText("EN")).toMatchObject(<span className="flag-icon flag-icon-gb" />);
});