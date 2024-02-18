export const Str = {
  random(length, {
    upper = true,
    lower = true,
    number = true,
    symbols = false
  }) {
    let result = '', characters = '', pattern = '', counter = 0;

    if (upper) {
      characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      pattern += '(?=.*[A-Z])';
    }

    if (lower) {
      characters += 'abcdefghijklmnopqrstuvwxyz';
      pattern += '(?=.*[a-z])';
    }
    
    if (number) {
      characters += '0123456789';
      pattern += '(?=.*[0-9])';
    }

    if (symbols) {
      characters += '~`!@#$%^&*()_-+=|\\}]{["\':;?/>.<,';
      pattern += '(?=.*[~`!@#$%^&*()_\\-+=|\\}\\]{["\':;?\\/>.<,])';
    }

    if (characters === '') {
      return result;
    }

    const charactersLength = characters.length;
    const regex = new RegExp(`^${pattern}.+$`);

    do {
      result = '';
      counter = 0;
      while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
      }
    } while (!regex.test(result));

    return result;
  }
}
