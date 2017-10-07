/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   StarShip.class.hpp                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jmaiquez <jmaiquez@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/10/07 10:52:18 by jmaiquez          #+#    #+#             */
/*   Updated: 2017/10/07 11:05:16 by jmaiquez         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef STARSHIP_CLASS_HPP
# define STARSHIP_CLASS_HPP

#include <iostream>
#include "GameEntity.class.hpp"

class StarShip : public GameEntity {
public:
  StarShip(std::string name, char type, int width, int height, Position pos);
  StarShip(StarShip const & src);
  virtual ~StarShip(void);

  StarShip& operator=(StarShip const & rhs);

private:
  StarShip(void);
};

#endif