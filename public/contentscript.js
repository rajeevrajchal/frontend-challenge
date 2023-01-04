console.log('Contentscript injected');

const parentElement = document.querySelector(
  '#root > div > div > div.makeStyles-mainPanel-3 > div.makeStyles-scrollbars-5 > div:nth-child(1) > div > section > div:nth-child(2) > h2',
);

const budgetValueElement = document.querySelector(
  '#root > div > div > div.makeStyles-mainPanel-3 > div.makeStyles-scrollbars-5 > div:nth-child(1) > div > section > div:nth-child(3) > p:nth-child(3)',
);

const paragraphText = document.querySelector(
  '#root > div > div > div.makeStyles-mainPanel-3 > div.makeStyles-scrollbars-5 > div:nth-child(1) > div > section > div:nth-child(2)',
);

const toolTipStyle = {
  display: 'none',
  position: 'absolute',
  backgroundColor: 'lightgrey',
  padding: '10px',
  width: '300px',
  borderRadius: '10px',
};

const buttonStyle = {
  cursor: 'pointer',
  padding: '10px',
  borderRadius: '10px',
  marginLeft: '10px',
};

const titleStyle = {
  fontWeight: 'bold',
};

fetch('https://api.github.com/search/repositories?q=climate+change&sort=stars&order=desc')
  .then((response) => response.json())
  .then((data) => {
    let repositoryDescription = '';
    for (let i = 0; i < 3; i++) {
      const repository = data.items[i];
      repositoryDescription = repositoryDescription + ' ' + repository?.description || '';
    }
    const repoDiv = document.createElement('div');
    const titleRepoParagraph = document.createElement('p');
    Object.assign(titleRepoParagraph.style, titleStyle);
    titleRepoParagraph.textContent = 'Description of 3 Repositories';

    const githubParagraph = document.createElement('p');
    githubParagraph.textContent = repositoryDescription;
    repoDiv.appendChild(titleRepoParagraph);
    repoDiv.appendChild(githubParagraph);
    paragraphText.appendChild(repoDiv);
  });

const budgetToBeat = document.createElement('button');
const budget = budgetValueElement.textContent;
// styling tooltips
Object.assign(budgetToBeat.style, buttonStyle);
const buttonText = `Budget-to-Beat: ${budget}`;
budgetToBeat.textContent = buttonText;

// tooltip or popover
var tooltip = document.createElement('div');
Object.assign(tooltip.style, toolTipStyle);
tooltip.innerHTML =
  'Climate change refers to long-term shifts in temperatures and weather patterns. These shifts may be natural, such as through variations in the solar cycle.';

// Attach the mouseover event
budgetToBeat.addEventListener('mouseover', function () {
  tooltip.style.display = 'block';
  // helps to get position of the tooltip
  var toolTipPosition = budgetToBeat.getBoundingClientRect();

  var x = toolTipPosition.left + (budgetToBeat.offsetWidth - tooltip.offsetWidth) / 2;
  var y = toolTipPosition.top - tooltip.offsetHeight - 10;

  tooltip.style.left = x + 'px';
  tooltip.style.top = y + 'px';
});

// Attach the mouseout event
budgetToBeat.addEventListener('mouseout', function () {
  tooltip.style.display = 'none';
});

parentElement.appendChild(budgetToBeat);
document.body.appendChild(tooltip);
