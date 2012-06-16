goog.provide('example.sample1');

goog.require('example.ct');

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
 * @param {boolean} opt_append if we want to append
 * @return {void}
 */
example.sample1.elementHTML = function(element, html, opt_append)
{
  if(opt_append) {
    element.innerHTML += html;
  } else {
    element.innerHTML = html;
  }

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
