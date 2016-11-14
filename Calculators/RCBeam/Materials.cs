
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Xml.Serialization;
namespace Calculators.RCBeam
{
    public class Material
    {
        public List<Concrete> Concrete { get; set; }
        public List<Steel> Steel { get; set; }
    }
    public class MaterialOperations
    {
        private string filePath;
        public MaterialOperations(string filePath)
        {
            this.filePath = filePath;
        }

        public Material GetMaterials()
        {
            Material material;
            XmlSerializer serializer = new XmlSerializer(typeof(Material));
            using (var reader = new StringReader(this.filePath)) 
            {
                material = serializer.Deserialize(reader) as Material;
            }
            return material;
        }
        public IEnumerable<Concrete> GetConcrete()
        {
            return GetMaterials().Concrete;
        }
        public IEnumerable<Steel> GetSteel()
        {
            return GetMaterials().Steel;
        }
    }
}
