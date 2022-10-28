//
//  Created by Jonathan Pinho and Vinicius Mangueira on 26/06/2018.
//  Copyright � 2018 Jonathan. All rights reserved.
// Version 0.8 Relase: Beta

#include <stdio.h>
void imprimir();
void inicializa();
void direita();
void esquerda();
void cima();
void baixo();

int x = 0, y = 0;//Coordenadas da matriz
char mat[4][4];//Cria��o da matriz

int main(void) {
    char tecla;
    
    inicializa();//Inicializa��o da Matriz
    while(1){
		tecla = getch();
		system("cls");
		switch(tecla){
		    case 97: esquerda();//Movimentar para esquerda
		        break;
		    case 100: direita();//Movimentar para direita
		        break;
			case 113: exit(0);//Para encerrar o jogo
		      	
			case 115: baixo();//Movimentar para baixo
		    	break;
		    case 119: cima();//Movimentar para cima
		        break;
	        default: printf("Teclas permitidas: \nPara cima (tecla W), \nPara baixo (tecla S),\nPara a esquerda (tecla A)\nPara a direita (tecla D)\nPara sair (tecla Q)\n\n");
	            break;
        }
        imprimir();
    }
    printf("\n\n");
    return 0;
}
void inicializa(){//Fun��o que inicializa a matriz no in�cio do programa
    int i, j;
    for(i = 0; i < 4; i++ )
        for(j = 0; j < 4; j++)
            mat[i][j] = ' ';

    mat[0][0] = '*';//Origem
	imprimir();
}


void imprimir(){//Fun��o que imprime a matriz completa
    int i, j;
    for(i = 0; i < 4; i++){
        printf("|");
        for(j = 0; j < 4; j++){
            printf("%c",mat[i][j]);
        }
        printf("|\n");
    }
}

void direita(){//Fun��o que move o '*' para a direita
    char aux;
    int a = x, b = y+1;
	if(b>=0 && b<=3) { //Adicionando limite para a extremidade direita
	    aux = mat[x][y];
	    mat[x][y] = mat[x][y+1];
	    mat[x][y+1] = aux;
	    y +=1;
	}
}

void esquerda(){//Fun��o que move o '*' para a esquerda
    char aux;
    int a = x, b = y-1;
	if(b>=0 && b<=3) { //Adicionando limite para a extremidade esquerda
	    aux = mat[x][y];
	    mat[x][y] = mat[x][y-1];
	    mat[x][y-1] = aux;
	    y -=1;
	}
}

void cima(){//Fun��o que move o '*' para a cima
    char aux;
    int a = x-1, b = y;
	if(a>=0 && a<=3) { //Adicionando limite para a extremidade de cima
		aux = mat[x][y];
	    mat[x][y] = mat[x-1][y];
	    mat[x-1][y] = aux;
	    x -=1;
	}
}

void baixo(){//Fun��o que move o '*' para a baixo
    char aux;
    int a = x+1, b = y;
	if(a>=0 && a<=3) { //Adicionando limite para a extremidade de baixo
	    aux = mat[x][y];
	    mat[x][y] = mat[x+1][y];
	    mat[x+1][y] = aux;
		x +=1;
	}   
}
