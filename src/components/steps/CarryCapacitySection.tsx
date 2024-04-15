import { InputContainer, InputRow, StyledInput } from './InputFormComponents'
import { Button } from '../Button'

export default ({
  carryCapacity,
  carryCapacityError,
  setCarryCapacity,
  finaliseCarryCapacity
}: {
  carryCapacity: number
  carryCapacityError: string
  setCarryCapacity: Function
  finaliseCarryCapacity: Function
}) => (
  <>
    <h2>Please specify carrying capacity in kg</h2>
    <InputContainer>
      <InputRow>
        <h3>Capacity</h3>
        <StyledInput
          onChange={e => setCarryCapacity(e.target.value)}
          onClick={e => {
            const target = e.target as HTMLInputElement
            target.select()
          }}
          type='text'
          value={carryCapacity}
        />
      </InputRow>
      {carryCapacityError && (
        <p style={{ color: 'red' }}>{carryCapacityError}</p>
      )}
      <Button onClick={() => finaliseCarryCapacity()}>
        Set Carrying Capacity
      </Button>
    </InputContainer>
  </>
)
