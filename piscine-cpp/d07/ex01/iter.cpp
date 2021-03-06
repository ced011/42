/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   iter.cpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jmaiquez <jmaiquez@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/10/11 14:02:10 by jmaiquez          #+#    #+#             */
/*   Updated: 2017/10/12 09:57:44 by jmaiquez         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <iostream>

template <typename T>
void iter(T * tab, size_t length, void (*f)(T const &)) {
  for (int i = 0; i < length; i++) {
    f(tab[i]);
  }
  return;
}

template <typename T>
void print(T & str) {
  std::cout << str << std::endl;
}

int main(void) {
  std::string names[] = {"Jimi", "Alex", "Florian", "Alexandre", "Valentin", "David"};
  int const numbers[] = {21, 42, 4, 2};
  
  ::iter(names, 6, print);
  ::iter(numbers, 4, print);
  return (0);
}