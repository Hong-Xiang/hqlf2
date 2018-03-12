export class Task {
  id: number;
  desc: string;
  worker: string;
  workdir: string;
  type: string;
  dependency: number[];
  time_stamp: {
    create: string | null;
    start: string | null;
    end: string | null;
  };
  state: string;
  data: any;
}
