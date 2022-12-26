import {
  Card as ChakraCard,
  CardBody as ChakraCardBody,
  CardBodyProps as ChakraCardBodyProps,
  CardFooter as ChakraCardFooter,
  CardFooterProps as ChakraCardFooterProps,
  CardHeader as ChakraCardHeader,
  CardHeaderProps as ChakraCardHeaderProps,
  CardProps as ChakraCardProps,
} from '@chakra-ui/react'
import type { FunctionComponent } from 'react'

export type CardProps = ChakraCardProps

export const Card: FunctionComponent<CardProps> = (props) => {
  return <ChakraCard {...props} />
}

export type CardHeaderProps = ChakraCardHeaderProps

export const CardHeader: FunctionComponent<CardHeaderProps> = (props) => {
  return <ChakraCardHeader {...props} />
}

export type CardBodyProps = ChakraCardBodyProps

export const CardBody: FunctionComponent<CardBodyProps> = (props) => {
  return <ChakraCardBody {...props} />
}

export type CardFooterProps = ChakraCardFooterProps

export const CardFooter: FunctionComponent<CardFooterProps> = (props) => {
  return <ChakraCardFooter {...props} />
}
