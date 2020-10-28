export interface IComplexProps {
  id: string;
}

export interface IChildOneProps {
  name: string;
  onNameChange(name: string): void;
}

export interface IChildTwoProps {
  age: number;
  onAgeChange(age: number): void;
}