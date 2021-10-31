import { Meta } from '@storybook/react';
import {NodalBackgroundWrapper} from "./NodalBackgroundWrapper";
import {NodalBackgroundProps} from "../src/NodalBackground";

export default {
  title: 'Introduction',
  component: Introduction,
  argTypes: {
    linkColor: { control: 'color' },
  },
  parameters: {
    docs: {
      page: null
    }
  },
} as Meta;

export function Introduction(props: NodalBackgroundProps) {

  return <div>
    <h1>Nodal Background</h1>
    <NodalBackgroundWrapper {...props} />
  </div>
}

