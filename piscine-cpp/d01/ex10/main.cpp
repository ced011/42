/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.cpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jmaiquez <jmaiquez@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/10/03 19:06:11 by jmaiquez          #+#    #+#             */
/*   Updated: 2017/10/04 19:27:16 by jmaiquez         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <iostream>
#include <fstream>

int main(int argc, char** argv) {
  if (argc == 1) {
    char c;
    while (std::cin >> std::noskipws >> c) {
      std::cout << c;
    }
  }

  for (int i = 1; i < argc; i++) {
    std::ifstream ifs(argv[i]);

    if (ifs == 0) {
      std::cout << argv[0] << ": " << argv[i] << ": Cannot open file" << std::endl;
      return (1);
    }

    char c;
    while(ifs >> std::noskipws >> c) {
      std::cout << c;
    }
    ifs.close();
  }
  return (0);
}