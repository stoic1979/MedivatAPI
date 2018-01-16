import Vaccination from '../models/vaccination.model';
import BaseController from './baseController';

export default class VaccinationController extends BaseController {
    model = Vaccination;
}
