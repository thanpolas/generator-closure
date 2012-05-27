goog.provide('example.sample1');

/**
 * Get an element by it's ID
 * @param {string} elementId the element's ID
 * @return {Element}
 */
example.sample1.getElement = function(elementId)
{
  return document.getElementById(elementId);
};

/**
 * Set the element's content
 *
 * @param {Element} element
 * @param {string} html
 * @return {void}
 */
example.sample1.elementHTML = function(element, html)
{
  element.innerHTML = html;
};

/**
 * @param {number} num
 * @return {number}
 */
example.sample1.timesTen = function(num)
{
  return num * 10;
};

/**
 * @param {string} str
 * @return {string}
 */
example.sample1.locateString = function(str)
{
  return str + 'addThis';
};
