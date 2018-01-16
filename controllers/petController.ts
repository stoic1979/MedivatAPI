import Pet from '../models/pet.model';
import BaseController from './baseController';

export default class PetController extends BaseController {
    model = Pet;
}
