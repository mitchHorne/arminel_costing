import { InputContainer, InputRow } from './InputFormComponents'
import { Button, Dropdown } from '..'
import { woodSizes } from '../../constants'

export default ({
  sideSlatSize,
  stepSevenError,
  setCrateSideValues,
  finaliseCrateSide
}: {
  sideSlatSize: string
  stepSevenError: string
  setCrateSideValues: Function
  finaliseCrateSide: Function
}) => (
  <>
    <h2>Crate side slats</h2>
    <InputContainer>
      <InputRow>
        <h4>Width and thickness of side slats</h4>
        <Dropdown
          options={woodSizes}
          onChange={(e: { value: string }) => {
            const value: string = e.value
            setCrateSideValues(value)
          }}
          placeholder='Select side slat width and thickness'
          value={sideSlatSize}
        />
      </InputRow>
      {stepSevenError && <p style={{ color: 'red' }}>{stepSevenError}</p>}
      <Button onClick={() => finaliseCrateSide()}>Finalise crate sides</Button>
    </InputContainer>
  </>
)
