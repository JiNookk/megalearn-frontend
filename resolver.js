import { Resolver } from '@parcel/plugin';

export default new Resolver({
  async resolve({ specifier }) {
    if (specifier === 'react-refresh') {
      return { isExcluded: true };
    }

    return null;
  },
});
