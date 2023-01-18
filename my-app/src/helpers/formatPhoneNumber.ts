export const formatPhoneNumber = (input: string): string => {
  return input.replace(/(\d{2})(\d{3})(\d{3})(\d{4}|(\d{3}))/, '+$1 $2-$3-$4');
};
