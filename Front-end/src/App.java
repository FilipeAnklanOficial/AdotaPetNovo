import Enums.Status;
import Enums.Sexo;
import Enums.Especie;
import Enums.Porte;

public class App {

    public static void main(String[] args) {

    //ANIMAL 1 - PREENCHIDO ATRAVÉS DO CONSTRUTOR COM MÉTODOS
    Animal animal = new Animal(
            1,
            "Flora",
            "Sem Raça definida",
            2,
            "Vacinada e castrada",
            "Muito Dócil e Curiosa",
            "EXEMPLO-FOTO.JPG",
            false,
            "Sabáudia-PR",
            true,
            Especie.GATO,
            Porte.PEQUENO,
            Sexo.FEMEA,
            Status.DISPONIVEL);
    Animal animal1 = new Animal();

    //ANIMAL 2 - PREENCHIDO POR MÉTODOS SETS
    animal1.setId(2);
    animal1.setNome("Isis");
    animal1.setRaca("Chow-Chow");
    animal1.setIdade(3);
    animal1.setHistoricoSaude("Vacinada e Castrada");
    animal1.setComportamento("Amorosa e comportada");
    animal1.setFotos("FOTOS-EXEMPLO.JPG");
    animal1.setPossuiChip(false);
    animal1.setLocalizacao("Arapongas-PR");
    animal1.setVacinado(true);
    animal1.setSexo(Sexo.FEMEA);
    animal1.setEspecie(Especie.CACHORRO);
    animal1.setPorte(Porte.GRANDE);
    animal1.setStatus(Status.DISPONIVEL);

    //EXIBI INFORMAÇÕES DOS ANIMAIS CADASTRADOS
        System.out.println(animal.getIdade());
        animal.setIdade(0.6);
        System.out.println(animal.getIdade());
    }
}