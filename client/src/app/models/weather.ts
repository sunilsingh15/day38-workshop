export class Weather {
  constructor(
    public city: string,
    public current_status: string,
    public description: string,
    public temperature: number,
    public feels_like: number,
    public min_temp: number,
    public max_temp: number,
    public pressure: number,
    public humidity: number
  ) { }
}
