/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   wolf.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jmaiquez <jmaiquez@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/03/02 17:20:43 by jmaiquez          #+#    #+#             */
/*   Updated: 2016/03/02 18:33:00 by jmaiquez         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "wolf3d.h"

void		dep(t_mlx *mlx, t_point ***p)
{
	int		i;
	int		val;
	int		x;
	int		y;
	int		size;

	i = 0;
	val = 0;
	x = mlx->beginx;
	y = mlx->beginy;
	size = 0;
	ft_putnbr(x);
	ft_putstr(" - ");
	ft_putnbr(y);
	ft_putstr("\n\n");
	while (val != 1)
	{
		val = p[y][x]->z;
		ft_putnbr(i);
		ft_putstr(" - ");
		ft_putnbr(val);
		ft_putchar('\n');
		y--;
		i++;
	}
	ft_putstr("Fini !");
}