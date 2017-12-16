import styled from '@ui/styled';

const withInputControlStyles = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit / 4,
  height: 30 + (theme.sizing.baseUnit / 2),
  lineHeight: 30,
  fontFamily: theme.typography.fontFamilySans,
}), 'Input.Control');

export default withInputControlStyles;
