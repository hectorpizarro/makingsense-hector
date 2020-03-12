// Mock Axios library to avoid API calls in unit tests.

const mockAxios = jest.genMockFromModule("axios");
mockAxios.create = jest.fn(() => mockAxios);

export default mockAxios;
