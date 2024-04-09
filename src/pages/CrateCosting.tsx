import { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { constingsTypes, containerTypes, woodTypes } from '../constants'
import { Button, CostingChoiceButton } from '../components'

import {
  CarryCapacitySection,
  CostFinalization,
  CrateBottomSection,
  CrateSideSection,
  InnerDimensionsSection
} from '../components/steps'

interface Props {
  column?: boolean
}

const ContentContainer = styled.div<Props>`
  display: flex;

  ${props =>
    props.column
      ? `
    align-items: center;
    flex-direction: column;
    gap: 0.5rem;
  `
      : `justify-content: center;`}
`

const CostingTypeChoice = ({ chooseType }: { chooseType: Function }) => {
  return (
    <>
      <h2>Choose what to cost</h2>
      <ContentContainer>
        <CostingChoiceButton onClick={() => chooseType(constingsTypes.BOX)}>
          <i className='fas fa-archive'></i>
          Box Costing
        </CostingChoiceButton>
      </ContentContainer>
    </>
  )
}

const YesNoChoice = ({
  question,
  choiceFunction
}: {
  question: string
  choiceFunction: Function
}) => {
  return (
    <>
      <h2>{question}</h2>
      <ContentContainer>
        <Button onClick={() => choiceFunction(true)}>Yes</Button>
        <Button onClick={() => choiceFunction(false)}>No </Button>
      </ContentContainer>
    </>
  )
}

const MultiChoice = ({
  question,
  choiceFunction,
  choices
}: {
  question: string
  choiceFunction: Function
  choices: Array<string>
}) => {
  return (
    <>
      <h2>{question}</h2>
      <ContentContainer column>
        {choices.map(value => (
          <Button minWidth='13rem' onClick={() => choiceFunction(value)}>
            {value}
          </Button>
        ))}
      </ContentContainer>
    </>
  )
}

export const CrateCosting = (): JSX.Element => {
  const prices = useSelector((state: any) => state.prices)
  const [step, setStep] = useState(0)

  const [costingType, setCostingType] = useState(constingsTypes.NONE)

  const [forExport, setForExport] = useState(false)

  const [woodType, setWoodType] = useState('kilnDry')

  const [inContainer, setInContainer] = useState(false)

  const [containerType, setContainerType] = useState('')

  const [innerDimensionsLength, setInnerDimensionsLength] = useState(0)
  const [innerDimensionsWidth, setInnerDimensionsWidth] = useState(0)
  const [innerDimensionsHeight, setInnerDimensionsHeight] = useState(0)
  const [stepThreeError, setStepThreeError] = useState('')

  const [carryCapacity, setCarryCapacity] = useState(0)
  const [stepFourError, setStepFourError] = useState('')

  const [forkliftOnly, setForkliftOnly] = useState(false)

  const [numberOfBearers, setNumberOfBearers] = useState(0)
  const [bearerSize, setBearerSize] = useState('')
  const [bottomSlatSizes, setBottomSlatSizes] = useState('')
  const [stepSixError, setStepSixError] = useState('')

  const [sideSlatSize, setSideSlatSize] = useState('')
  const [stepSevenError, setStepSevenError] = useState('')

  const chooseCostingType = (choice: string) => {
    setCostingType(choice)
    setStep(1)
  }

  const chooseExport = (choice: boolean) => {
    setForExport(choice)
    if (choice) {
      setWoodType(woodTypes.KILNDRY)
      setStep(2)
    } else setStep(1.1)
  }

  const woodTypeOptions = [woodTypes.KILNDRY, woodTypes.WETOFFSAW]

  const chooseWood = (woodType: string) => {
    if (woodType === woodTypes.KILNDRY) setWoodType(woodTypes.KILNDRY)
    else setWoodType(woodTypes.WETOFFSAW)
    setStep(2)
  }

  const chooseContainer = (choice: boolean) => {
    setInContainer(choice)
    if (choice) setStep(2.1)
    else setStep(3)
  }

  const containerTypeChoices = [
    containerTypes.TENFOOT,
    containerTypes.TWENTYFOOT,
    containerTypes.TWENTYFOOTHC,
    containerTypes.FORTYFOOR
  ]

  const chooseContainerType = (containerType: string) => {
    setContainerType(containerType)
    setStep(3)
  }

  const setDimensions = (
    dimension: 'length' | 'width' | 'height',
    value: string
  ) => {
    if (isNaN(Number(value)))
      return setStepThreeError('Only numbers are allowed')

    if (dimension === 'length') setInnerDimensionsLength(Number(value))
    else if (dimension === 'width') setInnerDimensionsWidth(Number(value))
    else if (dimension === 'height') setInnerDimensionsHeight(Number(value))

    setStepThreeError('')
  }

  const finaliseDimensions = () => {
    const allValuesValid =
      innerDimensionsLength > 0 &&
      innerDimensionsWidth > 0 &&
      innerDimensionsHeight > 0

    if (!allValuesValid)
      return setStepThreeError('All dimensions must be greater than 0')

    setStep(4)
  }

  const handleSetCarryCapacity = (value: string) => {
    if (isNaN(Number(value)))
      return setStepFourError('Only numbers are allowed')

    setCarryCapacity(Number(value))
    setStepFourError('')
  }

  const finaliseCarryCapacity = () => {
    const carryCapacityValid = carryCapacity > 0

    if (!carryCapacityValid)
      return setStepFourError('Carry capacity must be greater than 0kg')

    setStep(5)
  }

  const forkliftOnlyChoices = ['Forklift Only', 'Forklift and Trolley']

  const chooseForkliftOnly = (forkliftOnly: boolean) => {
    setForkliftOnly(forkliftOnly)
    setStep(6)
  }

  const setBaseCrateValues = (
    part: 'numberOfBearers' | 'bearerSize' | 'bottomSlatSizes',
    value: string
  ) => {
    if (part === 'numberOfBearers') {
      if (isNaN(Number(value)))
        return setStepSixError('Only numbers are allowed')
      setNumberOfBearers(Number(value))
    } else if (part === 'bearerSize') setBearerSize(value)
    else if (part === 'bottomSlatSizes') {
      setBottomSlatSizes(value)
      setSideSlatSize(value)
    }

    setStepSixError('')
  }

  const finaliseCrateBase = () => {
    const numberOfBearersValid = numberOfBearers > 0
    const bearerSizeChosen = bearerSize !== ''
    const bottomSlatSizeChosen = bottomSlatSizes !== ''

    const allValuesValid =
      numberOfBearersValid && bearerSizeChosen && bottomSlatSizeChosen

    if (!allValuesValid) return setStepSixError('All values must be set')

    setStep(7)
  }

  const finaliseCrateSide = () => setStep(8)

  return (
    <div>
      {step === 0 && <CostingTypeChoice chooseType={chooseCostingType} />}
      {step === 1 && (
        <YesNoChoice
          question='Is the crate for exporting purposes?'
          choiceFunction={chooseExport}
        />
      )}
      {step === 1.1 && (
        <MultiChoice
          question='Is the wood Kiln dry or wet offsaw?'
          choiceFunction={chooseWood}
          choices={woodTypeOptions}
        />
      )}
      {step === 2 && (
        <YesNoChoice
          choiceFunction={chooseContainer}
          question='Is the crate going to be transported in a container?'
        />
      )}
      {step === 2.1 && (
        <MultiChoice
          choiceFunction={chooseContainerType}
          question='What container spec is it going into?'
          choices={containerTypeChoices}
        />
      )}
      {step === 3 && (
        <InnerDimensionsSection
          innerDimensionsLength={innerDimensionsLength}
          innerDimensionsWidth={innerDimensionsWidth}
          innerDimensionsHeight={innerDimensionsHeight}
          innerDimensionsError={stepThreeError}
          setDimensions={setDimensions}
          finaliseDimensions={finaliseDimensions}
        />
      )}
      {step === 4 && (
        <CarryCapacitySection
          carryCapacity={carryCapacity}
          carryCapacityError={stepFourError}
          setCarryCapacity={handleSetCarryCapacity}
          finaliseCarryCapacity={finaliseCarryCapacity}
        />
      )}
      {step === 5 && (
        <MultiChoice
          choiceFunction={chooseForkliftOnly}
          question='Is it loaded by forklift only, or forklift and pallet Trolley?'
          choices={forkliftOnlyChoices}
        />
      )}

      {step === 6 && (
        <CrateBottomSection
          numberOfBearers={numberOfBearers}
          bearerSize={bearerSize}
          bottomSlatSizes={bottomSlatSizes}
          stepSixError={stepSixError}
          setBaseCrateValues={setBaseCrateValues}
          finaliseCrateBase={finaliseCrateBase}
          woodType={woodType}
        />
      )}

      {step === 7 && (
        <CostFinalization
          props={{
            prices,
            costingType,
            forExport,
            woodType,
            inContainer,
            containerType,
            innerDimensionsLength,
            innerDimensionsWidth,
            innerDimensionsHeight,
            carryCapacity,
            forkliftOnly,
            numberOfBearers,
            bearerSize,
            bottomSlatSizes
          }}
        />
        // <CrateSideSection
        //   sideSlatSize={sideSlatSize}
        //   stepSevenError={stepSevenError}
        //   setCrateSideValues={setSideSlatSize}
        //   finaliseCrateSide={finaliseCrateSide}
        // />
        // <
      )}
    </div>
  )
}
