import { InputContainer, InputRow, StyledInput } from '../InputFormComponents'
import { Button } from '../Button'

export default ({
  innerDimensionsLength,
  innerDimensionsWidth,
  innerDimensionsHeight,
  innerDimensionsError,
  setDimensions,
  finaliseDimensions
}: {
  innerDimensionsLength: number
  innerDimensionsWidth: number
  innerDimensionsHeight: number
  innerDimensionsError: string
  setDimensions: Function
  finaliseDimensions: Function
}) => (
  <>
    <h2>Please specify inner dimensions in mm</h2>
    <InputContainer>
      <InputRow>
        <h3>Length</h3>
        <StyledInput
          onChange={e => setDimensions('length', e.target.value)}
          onClick={e => {
            const target = e.target as HTMLInputElement
            target.select()
          }}
          type='text'
          value={innerDimensionsLength}
        />
      </InputRow>
      <InputRow>
        <h3>Width</h3>
        <StyledInput
          onChange={e => setDimensions('width', e.target.value)}
          onClick={e => {
            const target = e.target as HTMLInputElement
            target.select()
          }}
          type='text'
          value={innerDimensionsWidth}
        />
      </InputRow>
      <InputRow>
        <h3>Height</h3>
        <StyledInput
          onChange={e => setDimensions('height', e.target.value)}
          onClick={e => {
            const target = e.target as HTMLInputElement
            target.select()
          }}
          type='text'
          value={innerDimensionsHeight}
        />
      </InputRow>
      {innerDimensionsError && (
        <p style={{ color: 'red' }}>{innerDimensionsError}</p>
      )}
      <Button onClick={() => finaliseDimensions()}>Set Dimensions</Button>
    </InputContainer>
  </>
)
