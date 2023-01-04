import { fireEvent, render } from '@testing-library/react';
import { DomManipulationView } from '@views/user/DomManipulationView';

const buttonText = 'Budget-to-Beat:';

describe('DomManipulationView', () => {
  it(`contains a button with the text ${buttonText}`, () => {
    const parentElement = document.querySelector(
      '#root > div > div > div.makeStyles-mainPanel-3 > div.makeStyles-scrollbars-5 > div:nth-child(1) > div > section > div:nth-child(2) > h2',
    );
    const budgetToBeat = document.createElement('button');

    budgetToBeat.textContent = buttonText;
    parentElement?.appendChild(budgetToBeat);

    const { getByText } = render(<DomManipulationView />);
    const button = getByText(buttonText);
    expect(button).toBeInTheDocument();
  });

  it('displays a tooltip when the mouse is hovered over the button', () => {
    const { getByText } = render(<DomManipulationView />);
    const button = getByText(buttonText);
    fireEvent.mouseOver(button);
    const tooltip = getByText('This is a tooltip');
    expect(tooltip).toBeInTheDocument();
    fireEvent.mouseOut(button);
  });
});
