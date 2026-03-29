type SeqTuple<Length, Arr extends number[] = []> = Length extends Arr['length']
  ? Arr
  : SeqTuple<Length, [...Arr, Arr['length']]>;
type Seq<Length> = Ele<SeqTuple<Length>>;
type WithoutZero<T extends number> = Exclude<T, 0>;
type Ele<A extends any[]> = A[number];
type Inc<T extends number> = T extends infer B
  ? [any, ...SeqTuple<B>]['length']
  : never;
type Assert<E, A> = A extends E ? A : never;

type Delimiter = '/' | '-' | '.';
type YearFormat = `${number}${number}${number}${number}`;
type MonthFormat = WithoutZero<Seq<Inc<12>>>;
type DayFormat = WithoutZero<Seq<Inc<30>>>;
type DateFormat =
  `${YearFormat}${Delimiter}${MonthFormat}${Delimiter}${DayFormat}`;

type Test1 = SeqTuple<4>;
// ^?
type Test2 = Seq<4>;
// ^?
type Tests = [
  MonthFormat,
  // ^?
  DayFormat
  // ^?
];

type DateFormat2<F extends string> = F extends `${infer Start}YY${infer End}`
  ? DateFormat2<`${Start}${YearFormat}${End}`>
  : F extends `${infer Start}MM${infer End}`
  ? DateFormat2<`${Start}${MonthFormat}${End}`>
  : F extends `${infer Start}DD${infer End}`
  ? DateFormat2<`${Start}${DayFormat}${End}`>
  : F;

type TestDateFormat2 = DateFormat2<'date:YY-MM-DD'>;
// ^?

const t1: DateFormat2<'date: YY-MM-DD'> = 'date: 2021-1-29';
const t2: DateFormat2<'today: YY-MM-DD'> = 'today: 2022-1/29';
