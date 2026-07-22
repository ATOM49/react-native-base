import { render, screen } from '@testing-library/react-native';

import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

describe('gluestack ui primitives', () => {
  it('Text renders its children', async () => {
    await render(<Text>Hello world</Text>);

    expect(screen.getByText('Hello world')).toBeOnTheScreen();
  });

  it('Button exposes an accessible role and label', async () => {
    await render(
      <Button>
        <ButtonText>Press me</ButtonText>
      </Button>
    );

    expect(screen.getByRole('button')).toBeOnTheScreen();
    expect(screen.getByText('Press me')).toBeOnTheScreen();
  });
});
