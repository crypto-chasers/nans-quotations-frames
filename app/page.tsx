import {
  FrameButton,
  FrameContainer,
  FrameImage,
  FrameReducer,
  NextServerPageProps,
  getPreviousFrame,
  useFramesReducer,
} from "frames.js/next/server";

type State = {
  activeIndex: number;
};

const initialState: State = {
  activeIndex: 1,
};

const MAX_INDEX = 25;

const reducer: FrameReducer<State> = (state, action) => {
  let previousIndex = state.activeIndex;
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * Number(MAX_INDEX)) + 1;
  } while (newIndex === previousIndex);

  return { activeIndex: newIndex };
};

// This is a react server component only
export default async function Home({
  params,
  searchParams,
}: NextServerPageProps) {
  const previousFrame = getPreviousFrame<State>(searchParams);

  const [state, dispatch] = useFramesReducer<State>(
    reducer,
    initialState,
    previousFrame
  );

  return (
    <FrameContainer
      postUrl="/frames"
      state={state}
      previousFrame={previousFrame}
    >
      <FrameImage
        src={`${process.env.NEXT_PUBLIC_HOST}/${state.activeIndex}.webp`}
      />
      <FrameButton onClick={dispatch}>next</FrameButton>
    </FrameContainer>
  );
}
