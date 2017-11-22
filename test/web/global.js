/**
 * Setup configuration for Jest
 * @author ayusharma
 */
import 'raf/polyfill';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

window.API_URL = 'http://example.com';
