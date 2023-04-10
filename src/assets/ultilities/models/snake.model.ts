import { Feeding } from './feeding.model';
import { Note } from './note.model';
import { Weight } from './weight.model';
import { Shed } from './shed.model';

export type Snake = {
  id?: number;
  owner?: string;
  name: string;
  breederId: string;
  imgUrl: string;
  gender?: 'Male' | 'Female' | 'Unknown';
  feedingsDto?: Feeding[];
  notesDto?: Note[];
  weightsDto?: Weight[];
  shedsDto?: Shed[];
};
