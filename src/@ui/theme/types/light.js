import Color from 'color';

const light = ({ colors, alpha }) => ({
  colors: {
    text: {
      primary: colors.darkPrimary,
      secondary: colors.darkSecondary,
      tertiary: colors.darkTertiary,
      link: colors.primary,
    },
    background: {
      default: colors.white,
      primary: colors.primary,
      accent: Color(colors.lightTertiary).fade(alpha.high).string(),
      inactive: colors.lightTertiary,
      overlay: Color(colors.darkTertiary).fade(alpha.high).string(),
      darkOverlay: Color(colors.darkTertiary).fade(alpha.low).string(),
      // todo
    },
    shadows: {
      default: colors.lightTertiary,
    },
    input: {
      // todo
      placeholder: colors.darkTertiary,
    },
    action: {
      default: colors.lightTertiary,
      primary: colors.primary,
      secondary: colors.secondary,
      tertiary: colors.tertiary,
    },
  },
});

export default light;
