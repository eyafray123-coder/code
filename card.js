/**
 * Reusable pricing card.
 * @param {string} title
 * @param {string} price
 * @param {string[]} features
 * @param {{ cta?: string, onSelect?: () => void }} [options]
 * @returns {HTMLElement}
 */
function Card(title, price, features, options = {}) {
  const { cta = "Start Trial", onSelect } = options;
  const root = document.createElement("article");
  root.className = "pricing";
  const heading = document.createElement("h2");
  heading.className = "title";
  heading.textContent = title;
  const priceEl = document.createElement("p");
  priceEl.className = "price";
  priceEl.textContent = price;
  const list = document.createElement("ul");
  list.className = "features";
  for (const item of features) {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  }
  const button = document.createElement("button");
  button.type = "button";
  button.className = "btn";
  button.textContent = cta;
  if (onSelect) {
    button.addEventListener("click", onSelect);
  }
  root.append(heading, priceEl, list, button);
  return root;
}
